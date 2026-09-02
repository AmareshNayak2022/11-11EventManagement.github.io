/* ==========================================================================
   11:11 — Elevenn Elevenn Archive Pvt Ltd — QR encoder
   Loaded by book.html only, before js/booking.js. Vanilla, no libraries.

   WHY THIS FILE EXISTS
   The client's UPI QR (images/upi-qr.png) carries the payee but NO amount, so
   a visitor scanning it on a desktop has to type the figure in themselves. On
   2 Sept 2026 the client worked around that by hand, sending two fixed QR
   images — one reading am=3998 (two Vogue passes) and one am=2499 (one Elite).
   Both are the same account as ours; both are also wrong for every other
   basket, and both die on 7 September when the early-bird rate ends.

   So the amount is not baked into a picture. This encoder draws the code in
   the browser from the exact upi:// string js/booking.js already builds for
   the "Open UPI App" button, which means the scanned amount and the tapped
   amount cannot disagree, at any pass count, on either side of the deadline.

   SCOPE, deliberately narrow — this is not a general QR library:
     · byte mode only (a upi:// URI is not alphanumeric-safe)
     · error-correction level M only, matching the client's own codes
     · versions 1–12, which covers ~290 bytes; our string is about 130

   It encodes; it does not decode. If anything here is ever edited, re-run the
   round-trip check described in README.md before pushing — a QR that encodes
   the wrong amount is money in the wrong place.

   CONTENTS
   01. GF(256) arithmetic and Reed–Solomon
   02. Capacity tables (level M)
   03. Bitstream assembly
   04. Matrix construction
   05. Masking and penalty scoring
   06. Public API — QR.paint()
   ========================================================================== */

(function (global) {
  'use strict';

  /* ========================================================================
     01. GF(256) ARITHMETIC AND REED–SOLOMON

     The field is GF(2^8) with the QR primitive polynomial 0x11D. EXP is
     doubled to 512 entries so a log sum never needs a modulo.
     ======================================================================== */
  var EXP = new Array(512);
  var LOG = new Array(256);

  (function () {
    var x = 1, i;
    for (i = 0; i < 255; i++) {
      EXP[i] = x;
      LOG[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11D;
    }
    for (i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
  }());

  function gmul(a, b) {
    return (a === 0 || b === 0) ? 0 : EXP[LOG[a] + LOG[b]];
  }

  /* The generator polynomial for n check symbols: (x - a^0)(x - a^1)... In
     GF(2) subtraction is XOR, so the signs disappear. */
  function rsGenerator(n) {
    var g = [1], i, j, next;
    for (i = 0; i < n; i++) {
      next = new Array(g.length + 1);
      for (j = 0; j < next.length; j++) next[j] = 0;
      for (j = 0; j < g.length; j++) {
        next[j]     ^= gmul(g[j], 1);
        next[j + 1] ^= gmul(g[j], EXP[i]);
      }
      g = next;
    }
    return g;
  }

  /* Polynomial long division; the remainder is the error-correction block.
     gen[0] is always 1, so each step zeroes the leading term exactly. */
  function rsEncode(data, ecLen) {
    var gen = rsGenerator(ecLen);
    var buf = data.slice();
    var i, j, coef;
    for (i = 0; i < ecLen; i++) buf.push(0);
    for (i = 0; i < data.length; i++) {
      coef = buf[i];
      if (coef !== 0) {
        for (j = 0; j < gen.length; j++) buf[i + j] ^= gmul(gen[j], coef);
      }
    }
    return buf.slice(data.length);
  }

  /* ========================================================================
     02. CAPACITY TABLES — ERROR-CORRECTION LEVEL M ONLY

     Per version: [ec codewords per block, [blockCount, dataCodewords], ... ].
     Level M is what the client's own codes use, and it is the right trade for
     a code printed on a white plate and scanned from a phone screen.
     ======================================================================== */
  var BLOCKS_M = {
    1:  [10, [[1, 16]]],
    2:  [16, [[1, 28]]],
    3:  [26, [[1, 44]]],
    4:  [18, [[2, 32]]],
    5:  [24, [[2, 43]]],
    6:  [16, [[4, 27]]],
    7:  [18, [[4, 31]]],
    8:  [22, [[2, 38], [2, 39]]],
    9:  [22, [[3, 36], [2, 37]]],
    10: [26, [[4, 43], [1, 44]]],
    11: [30, [[1, 50], [4, 51]]],
    12: [22, [[6, 36], [2, 37]]]
  };

  var MAX_VERSION = 12;
  var FORMAT_BITS_M = 0;   // level M's two-bit indicator is 00

  function blockLayout(version) {
    var spec = BLOCKS_M[version];
    var sizes = [];
    var i, k;
    for (i = 0; i < spec[1].length; i++) {
      for (k = 0; k < spec[1][i][0]; k++) sizes.push(spec[1][i][1]);
    }
    return { ecLen: spec[0], sizes: sizes };
  }

  function dataCapacity(version) {
    var layout = blockLayout(version);
    var total = 0, i;
    for (i = 0; i < layout.sizes.length; i++) total += layout.sizes[i];
    // 4 bits of mode indicator plus the byte-count field, which widens at v10.
    var headerBits = 4 + (version < 10 ? 8 : 16);
    return Math.floor((total * 8 - headerBits) / 8);
  }

  /* ========================================================================
     03. BITSTREAM ASSEMBLY
     ======================================================================== */

  /* UTF-8 bytes. A upi:// string is ASCII in practice, but the payee name is
     free text and one stray non-ASCII character must not corrupt the code. */
  function toBytes(text) {
    var out = [], i, c;
    var encoded = unescape(encodeURIComponent(text));
    for (i = 0; i < encoded.length; i++) {
      c = encoded.charCodeAt(i) & 0xFF;
      out.push(c);
    }
    return out;
  }

  function chooseVersion(byteLen) {
    var v;
    for (v = 1; v <= MAX_VERSION; v++) {
      if (byteLen <= dataCapacity(v)) return v;
    }
    return 0;   // too long — the caller falls back to the static image
  }

  function buildCodewords(bytes, version) {
    var layout = blockLayout(version);
    var bits = [];
    var i, j;

    function push(value, length) {
      for (var b = length - 1; b >= 0; b--) bits.push((value >>> b) & 1);
    }

    push(4, 4);                                   // byte mode
    push(bytes.length, version < 10 ? 8 : 16);
    for (i = 0; i < bytes.length; i++) push(bytes[i], 8);

    var totalData = 0;
    for (i = 0; i < layout.sizes.length; i++) totalData += layout.sizes[i];
    var capacityBits = totalData * 8;

    // Terminator, then pad to a byte boundary, then the alternating pad bytes.
    for (i = 0; i < 4 && bits.length < capacityBits; i++) bits.push(0);
    while (bits.length % 8 !== 0) bits.push(0);

    var data = [];
    for (i = 0; i < bits.length; i += 8) {
      var byteVal = 0;
      for (j = 0; j < 8; j++) byteVal = (byteVal << 1) | bits[i + j];
      data.push(byteVal);
    }
    var pad = [0xEC, 0x11], p = 0;
    while (data.length < totalData) { data.push(pad[p]); p ^= 1; }

    // Split into blocks, error-correct each, then interleave both halves —
    // data codewords first, then all the EC codewords, exactly as the spec
    // orders them. Interleaving is what lets a scanner survive a smudge.
    var dataBlocks = [], ecBlocks = [], offset = 0;
    for (i = 0; i < layout.sizes.length; i++) {
      var block = data.slice(offset, offset + layout.sizes[i]);
      offset += layout.sizes[i];
      dataBlocks.push(block);
      ecBlocks.push(rsEncode(block, layout.ecLen));
    }

    var result = [], maxLen = 0;
    for (i = 0; i < dataBlocks.length; i++) {
      if (dataBlocks[i].length > maxLen) maxLen = dataBlocks[i].length;
    }
    for (i = 0; i < maxLen; i++) {
      for (j = 0; j < dataBlocks.length; j++) {
        if (i < dataBlocks[j].length) result.push(dataBlocks[j][i]);
      }
    }
    for (i = 0; i < layout.ecLen; i++) {
      for (j = 0; j < ecBlocks.length; j++) result.push(ecBlocks[j][i]);
    }
    return result;
  }

  /* ========================================================================
     04. MATRIX CONSTRUCTION

     Coordinates throughout are grid[row][col]. `fn` marks function patterns —
     everything the data stream must step over and the mask must not touch.
     ======================================================================== */

  function alignmentPositions(version) {
    if (version === 1) return [];
    var count = Math.floor(version / 7) + 2;
    var size  = version * 4 + 17;
    var step  = Math.floor((version * 4 + count * 2 + 1) / (count * 2 - 2)) * 2;
    var pos = [], p;
    for (p = size - 7; pos.length < count - 1; p -= step) pos.unshift(p);
    pos.unshift(6);
    return pos;
  }

  function newMatrix(version) {
    var size = version * 4 + 17;
    var grid = [], fn = [], r, c;
    for (r = 0; r < size; r++) {
      grid.push([]); fn.push([]);
      for (c = 0; c < size; c++) { grid[r].push(0); fn[r].push(0); }
    }

    function set(r, c, v) {
      if (r < 0 || c < 0 || r >= size || c >= size) return;
      grid[r][c] = v ? 1 : 0;
      fn[r][c] = 1;
    }

    // Finder patterns and their separators.
    function finder(top, left) {
      var dr, dc, d;
      for (dr = -1; dr <= 7; dr++) {
        for (dc = -1; dc <= 7; dc++) {
          // Chebyshev distance from the pattern's centre: 0-1 dark core,
          // 2 light ring, 3 dark ring, 4 the light separator.
          d = Math.max(Math.abs(dc - 3), Math.abs(dr - 3));
          set(top + dr, left + dc, d !== 2 && d !== 4);
        }
      }
    }
    finder(0, 0);
    finder(0, size - 7);
    finder(size - 7, 0);

    // Timing patterns.
    var i;
    for (i = 0; i < size; i++) {
      if (!fn[6][i]) set(6, i, i % 2 === 0);
      if (!fn[i][6]) set(i, 6, i % 2 === 0);
    }

    // Alignment patterns, skipping the three that would sit on a finder.
    var pos = alignmentPositions(version), a, b, dr, dc;
    for (a = 0; a < pos.length; a++) {
      for (b = 0; b < pos.length; b++) {
        if ((a === 0 && b === 0) ||
            (a === 0 && b === pos.length - 1) ||
            (a === pos.length - 1 && b === 0)) continue;
        for (dr = -2; dr <= 2; dr++) {
          for (dc = -2; dc <= 2; dc++) {
            set(pos[a] + dr, pos[b] + dc,
                Math.max(Math.abs(dr), Math.abs(dc)) !== 1);
          }
        }
      }
    }

    // Reserve the format areas so data placement steps over them; the real
    // bits are written in drawFormat() once the mask is known.
    for (i = 0; i <= 8; i++) { set(8, i, 0); set(i, 8, 0); }
    for (i = 0; i < 8; i++) { set(8, size - 1 - i, 0); set(size - 1 - i, 8, 0); }
    set(size - 8, 8, 1);   // the always-dark module

    // Version information, v7 and up.
    if (version >= 7) {
      var rem = version, bit;
      for (i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
      var vbits = (version << 12) | rem;
      for (i = 0; i < 18; i++) {
        bit = (vbits >>> i) & 1;
        set(Math.floor(i / 3), size - 11 + (i % 3), bit);
        set(size - 11 + (i % 3), Math.floor(i / 3), bit);
      }
    }

    return { size: size, grid: grid, fn: fn };
  }

  function placeData(m, codewords) {
    var size = m.size, grid = m.grid, fn = m.fn;
    var bit = 0, total = codewords.length * 8;
    var right, vert, j, col, row, upward;

    for (right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;   // the vertical timing column is not data
      for (vert = 0; vert < size; vert++) {
        for (j = 0; j < 2; j++) {
          col = right - j;
          upward = ((right + 1) & 2) === 0;
          row = upward ? size - 1 - vert : vert;
          if (!fn[row][col] && bit < total) {
            grid[row][col] = (codewords[bit >>> 3] >>> (7 - (bit & 7))) & 1;
            bit++;
          }
        }
      }
    }
  }

  /* ========================================================================
     05. MASKING AND PENALTY SCORING
     ======================================================================== */

  function maskAt(mask, row, col) {
    switch (mask) {
      case 0: return (row + col) % 2 === 0;
      case 1: return row % 2 === 0;
      case 2: return col % 3 === 0;
      case 3: return (row + col) % 3 === 0;
      case 4: return (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0;
      case 5: return (row * col) % 2 + (row * col) % 3 === 0;
      case 6: return ((row * col) % 2 + (row * col) % 3) % 2 === 0;
      default: return ((row + col) % 2 + (row * col) % 3) % 2 === 0;
    }
  }

  function applyMask(m, mask) {
    var r, c;
    for (r = 0; r < m.size; r++) {
      for (c = 0; c < m.size; c++) {
        if (!m.fn[r][c] && maskAt(mask, r, c)) m.grid[r][c] ^= 1;
      }
    }
  }

  function drawFormat(m, mask) {
    var data = (FORMAT_BITS_M << 3) | mask;
    var rem = data, i, bit;
    for (i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    var bits = ((data << 10) | rem) ^ 0x5412;
    var size = m.size;

    function put(r, c, v) { m.grid[r][c] = v; m.fn[r][c] = 1; }

    for (i = 0; i <= 5; i++) put(i, 8, (bits >>> i) & 1);
    put(7, 8, (bits >>> 6) & 1);
    put(8, 8, (bits >>> 7) & 1);
    put(8, 7, (bits >>> 8) & 1);
    for (i = 9; i < 15; i++) put(8, 14 - i, (bits >>> i) & 1);

    for (i = 0; i < 8; i++) put(8, size - 1 - i, (bits >>> i) & 1);
    for (i = 8; i < 15; i++) put(size - 15 + i, 8, (bits >>> i) & 1);
    put(size - 8, 8, 1);
  }

  /* The four penalty rules from the spec. The lowest-scoring mask is the one
     least likely to confuse a scanner — chiefly by not accidentally drawing
     something that looks like a finder pattern. */
  function penalty(m) {
    var size = m.size, grid = m.grid;
    var score = 0, r, c, i, run, last, dark = 0;

    // Rule 1 — runs of five or more of the same colour, in both directions.
    for (i = 0; i < 2; i++) {
      for (r = 0; r < size; r++) {
        run = 1; last = -1;
        for (c = 0; c < size; c++) {
          var v = i === 0 ? grid[r][c] : grid[c][r];
          if (v === last) {
            run++;
            if (run === 5) score += 3;
            else if (run > 5) score += 1;
          } else { last = v; run = 1; }
        }
      }
    }

    // Rule 2 — every 2x2 block of one colour.
    for (r = 0; r < size - 1; r++) {
      for (c = 0; c < size - 1; c++) {
        var a = grid[r][c];
        if (a === grid[r][c + 1] && a === grid[r + 1][c] && a === grid[r + 1][c + 1]) {
          score += 3;
        }
      }
    }

    // Rule 3 — the 1:1:3:1:1 finder-lookalike with four light modules beside it.
    var p1 = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
    var p2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
    function runMatches(line, at, pat) {
      for (var k = 0; k < 11; k++) if (line[at + k] !== pat[k]) return false;
      return true;
    }
    var line = new Array(size);
    for (i = 0; i < 2; i++) {
      for (r = 0; r < size; r++) {
        for (c = 0; c < size; c++) line[c] = i === 0 ? grid[r][c] : grid[c][r];
        for (c = 0; c + 11 <= size; c++) {
          if (runMatches(line, c, p1) || runMatches(line, c, p2)) score += 40;
        }
      }
    }

    // Rule 4 — how far the dark/light balance strays from even.
    for (r = 0; r < size; r++) {
      for (c = 0; c < size; c++) if (grid[r][c]) dark++;
    }
    var percent = dark * 100 / (size * size);
    score += Math.floor(Math.abs(percent - 50) / 5) * 10;
    return score;
  }

  /* ========================================================================
     06. PUBLIC API
     ======================================================================== */

  /* Returns { size, grid } for the finished, masked code, or null if the text
     will not fit in the versions this file covers. */
  function encode(text) {
    var bytes = toBytes(text);
    var version = chooseVersion(bytes.length);
    if (!version) return null;

    var codewords = buildCodewords(bytes, version);
    var best = null, mask, m, score;

    for (mask = 0; mask < 8; mask++) {
      m = newMatrix(version);
      placeData(m, codewords);
      applyMask(m, mask);
      drawFormat(m, mask);
      score = penalty(m);
      if (best === null || score < best.score) best = { score: score, m: m };
    }
    return { size: best.m.size, grid: best.m.grid, version: version };
  }

  /* Paints `text` into a <canvas>. The margin is the quiet zone, which a
     scanner genuinely needs — four modules is the spec's minimum. Returns
     true on success so the caller can leave the static image in place if the
     code could not be drawn for any reason. */
  function paint(canvas, text, opts) {
    opts = opts || {};
    var code = encode(text);
    if (!code || !canvas || !canvas.getContext) return false;

    var ctx = canvas.getContext('2d');
    if (!ctx) return false;

    var margin = opts.margin === undefined ? 4 : opts.margin;
    var total  = code.size + margin * 2;
    // Aim for roughly the pixel size of the image this replaces, snapped to a
    // whole number of pixels per module so no edge lands on a half-pixel.
    var scale  = opts.scale || Math.max(2, Math.floor((opts.target || 600) / total));

    canvas.width  = total * scale;
    canvas.height = total * scale;

    ctx.fillStyle = opts.light || '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = opts.dark || '#000000';

    var r, c;
    for (r = 0; r < code.size; r++) {
      for (c = 0; c < code.size; c++) {
        if (code.grid[r][c]) {
          ctx.fillRect((c + margin) * scale, (r + margin) * scale, scale, scale);
        }
      }
    }
    return true;
  }

  global.QR = { encode: encode, paint: paint };

}(this));
