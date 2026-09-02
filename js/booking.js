/* ==========================================================================
   11:11 — Elevenn Elevenn Archive Pvt Ltd — booking page behaviour
   Loaded by book.html only. Vanilla JavaScript, no libraries, no build step.

   js/script.js runs first and owns everything this page shares with the home
   page — the header state, the scroll reveal, and the countdown. This file
   knows about one thing: the reservation form.

   CONTENTS
   01. Configuration (prices live in the HTML, not here)
   02. Helpers & money formatting
   03. Live totals, the seat stepper, and the UPI link
   04. The payment QR — drawn from that same link
   05. Copy the UPI ID
   06. Validation
   07. Submit — hand the reservation to WhatsApp
   ========================================================================== */

(function () {
  'use strict';

  var form = document.getElementById('booking-form');
  if (!form) return;   // not the booking page

  /* ========================================================================
     01. CONFIGURATION

     WHERE THE MONEY GOES
     The UPI ID below is the client's own, read off the payment QR they
     supplied on 1 Sept 2026 (Elevenn Elevenn Archive Private Limited, IDFC
     FIRST Bank). images/upi-qr.png is a crop of that same QR, so the two ARE
     the same account — if one is ever changed, change the other in the same
     commit or the page will show a code and an ID that disagree.

     THE PRICES ARE NOT HERE, deliberately. Each tier carries its own
     data-price on the radio input in book.html, so changing a price is a
     one-word edit in the markup next to the figure the visitor reads. A price
     duplicated in a script is a price that will eventually disagree with the
     page.

     WHERE THE RESERVATION GOES
     The same concierge desk as every other enquiry on the site, and the same
     number in the same digits-only form. It appears in five places now — the
     contact block, the floating button and DELIVERY in js/script.js, plus the
     footer and this constant in the booking page. Change them together.
     ======================================================================== */
  var UPI_ID    = 'elevennelevenne-26@idfcbank';
  var UPI_PAYEE = 'Elevenn Elevenn Archive Private Limited';
  var WHATSAPP  = '919938120356';
  var EVENT     = 'NOXUS — Sat 26 September 2026';

  /* The instant the early-bird rate ends, which is also the instant the venue
     is revealed (client's poster, 1 Sept 2026). The explicit +05:30 matters: a
     bare '2026-09-07' parses as midnight UTC and would end the offer five and a
     half hours early for everyone. The same instant drives three countdowns in
     the markup — keep all four in step. */
  var EARLY_BIRD_ENDS = '2026-09-07T23:11:00+05:30';

  /* ========================================================================
     02. HELPERS & MONEY
     ======================================================================== */
  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* Indian digit grouping — 2,999 and 59,990, but also 1,00,000 if the seat
     ceiling is ever raised. Written out rather than handed to toLocaleString
     with an 'en-IN' tag, because a browser built without the Indian locale
     data silently falls back to 100,000 and nobody notices until it is on a
     phone in Bhubaneswar. */
  function groupINR(value) {
    var digits = String(Math.round(value));
    if (digits.length <= 3) return digits;
    var last3 = digits.slice(-3);
    var rest  = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return rest + ',' + last3;
  }

  // The rupee sign as a real character; the page writes it as &#8377;.
  function rupees(value) { return '₹' + groupINR(value); }

  function setText(key, text) {
    $$('[data-book="' + key + '"]').forEach(function (el) { el.textContent = text; });
  }

  /* ========================================================================
     03. THE PASSES, THE RATE, AND THE UPI LINK

     TWO THINGS SET THE PRICE, AND NEITHER IS A DROPDOWN.

     1. WHICH PASS. Vogue and Elite are bought here; Reserve is invitation-only
        and lives outside the form. Each pass carries its own figures on its
        radio in book.html — data-price-early, data-price-standard, data-min —
        next to the numbers a visitor reads. Nothing is hardcoded in this file,
        so a price change is an edit in the markup alone.

     2. WHEN. The early-bird rate runs until the venue is unveiled and the
        standard rate applies from that instant, so the page works out which is
        in force rather than offering it as a choice.

     data-min is what stops Vogue being an arbitrage: it is priced PER PERSON at
     the lower figure, so a single Vogue pass would undercut a single Elite pass
     and nobody would ever buy Elite. Vogue's minimum of two is CONFIRMED by the
     client (1 Sept 2026) — read from "for powerful couples" and "each" first,
     then put to them and agreed. It is a commercial rule, not a preference:
     relaxing it makes Elite unsellable.
     ======================================================================== */
  var passInputs = $$('input[name="pass"]', form);
  var seatsEl    = $('#seats', form);
  var upiLink    = $('#upi-link');
  var qrHolder   = $('.pay__qr');
  var qrImage    = $('#upi-qr-img');
  var qrCap      = $('[data-book="qr-cap"]');

  var EARLY_UNTIL = new Date(EARLY_BIRD_ENDS).getTime();

  // A malformed deadline must not silently hand out the cheaper rate forever,
  // so an unparseable date falls back to the standard price.
  function isEarlyBird() {
    return !isNaN(EARLY_UNTIL) && Date.now() < EARLY_UNTIL;
  }

  function currentPass() {
    for (var i = 0; i < passInputs.length; i++) {
      if (passInputs[i].checked) return passInputs[i];
    }
    return passInputs[0];
  }

  function priceOf(input) {
    return parseInt(input.getAttribute(
      isEarlyBird() ? 'data-price-early' : 'data-price-standard'), 10);
  }
  function minOf(input) {
    return parseInt(input.getAttribute('data-min'), 10) || 1;
  }

  // The pass count as an integer inside the current pass's own floor and the
  // input's ceiling, whatever the visitor typed. A number input accepts "" and
  // "-4" quite happily.
  function currentSeats() {
    var n = parseInt(seatsEl.value, 10);
    var min = minOf(currentPass());
    var max = parseInt(seatsEl.getAttribute('max'), 10) || 10;
    if (!isFinite(n)) n = min;
    if (n < min) n = min;
    if (n > max) n = max;
    return n;
  }

  function state() {
    var pass  = currentPass();
    var early = isEarlyBird();
    var unit  = priceOf(pass);
    var seats = currentSeats();
    return {
      name:  pass.value,
      per:   pass.getAttribute('data-per') || '',
      early: early,
      unit:  unit,
      seats: seats,
      min:   minOf(pass),
      total: unit * seats
    };
  }

  function refresh() {
    var s = state();
    var early = s.early;

    /* Every pass card repaints, not just the selected one: a visitor comparing
       Vogue against Elite after the deadline must see both standard prices,
       not one live figure beside one stale advertisement. */
    passInputs.forEach(function (input) {
      var card = document.querySelector('label[for="' + input.id + '"]');
      if (!card) return;
      var amount = card.querySelector('[data-pass-amount]');
      var was    = card.querySelector('[data-pass-was]');
      var win    = card.querySelector('[data-pass-window]');
      if (amount) amount.textContent = rupees(priceOf(input));
      if (was)    was.hidden = !early;
      if (win)    win.textContent = early ? 'Live now' : 'Standard rate';
    });

    // The floor moves with the pass, so the input has to agree with it or the
    // browser's own validation would disagree with ours.
    seatsEl.setAttribute('min', String(s.min));

    setText('tier',  s.name);
    setText('seats', String(s.seats));
    setText('unit',  rupees(s.unit) + (s.per ? ' ' + s.per : ''));
    setText('total', rupees(s.total));
    setText('total-short', rupees(s.total));
    setText('breakdown',
      s.seats + (s.seats === 1 ? ' pass' : ' passes') +
      ' × ' + rupees(s.unit) + ' — ' + s.name);
    setText('min-hint', s.min > 1
      ? s.name + ' is priced per person and booked in pairs, so ' + s.min + ' is the minimum.'
      : s.name + ' is a single pass, so one is enough.');

    /* The saving comes from the selected pass's own two figures, so it stays
       right if either moves, and it is hidden outright once the early-bird
       window shuts — a line reading "You save zero" would be worse than none. */
    var saveEl = $('[data-book="saving"]');
    if (saveEl) {
      var pass  = currentPass();
      var saved = early
        ? (parseInt(pass.getAttribute('data-price-standard'), 10) -
           parseInt(pass.getAttribute('data-price-early'), 10)) * s.seats
        : 0;
      saveEl.textContent = saved > 0 ? 'You save ' + rupees(saved) : '';
      saveEl.hidden = saved <= 0;
    }

    /* The UPI intent, rebuilt from scratch each time.

       am= must be a plain decimal with two places, never a grouped or
       symbol-prefixed figure, both of which UPI apps reject or silently drop.
       Note that a plain (unsigned) upi:// intent PRE-FILLS the amount but does
       not lock it: the payer can still edit the figure in their app. That is
       exactly why step 05 asks for the reference number and a person checks it
       against the account — the page never assumes the right amount arrived. */
    /* pa= keeps a LITERAL @. encodeURIComponent turns it into %40, and while
       that is correct URI escaping, "@" is a legal query character and some
       UPI apps do not unescape the VPA before using it — which turns the
       payee into elevennelevenne-26%40idfcbank and the payment into nothing.
       The client's own working QR codes and the static href in book.html both
       use the bare @, so this matches them. */
    var intent =
      'upi://pay' +
      '?pa=' + encodeURIComponent(UPI_ID).replace(/%40/g, '@') +
      '&pn=' + encodeURIComponent(UPI_PAYEE) +
      '&cu=INR' +
      '&am=' + s.total.toFixed(2) +
      '&tn=' + encodeURIComponent('NOXUS ' + s.name + ' x' + s.seats);

    if (upiLink) upiLink.href = intent;

    // The scanned code and the tapped link are the same string, always.
    paintQr(intent, s);
  }

  passInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      // Switching to a pass with a higher floor must lift the count with it,
      // or the form would sit on an invalid quantity the visitor never chose.
      seatsEl.value = currentSeats();
      refresh();
    });
  });

  if (seatsEl) {
    seatsEl.addEventListener('input',  refresh);
    seatsEl.addEventListener('change', function () {
      // Write the clamped value back only on change, not on every keystroke —
      // clamping mid-typing turns "10" into "1" the instant the 1 is typed.
      seatsEl.value = currentSeats();
      refresh();
    });
  }

  // The stepper buttons are a convenience over the same input, so they go
  // through its value rather than keeping a count of their own.
  $$('[data-qty-step]').forEach(function (button) {
    button.addEventListener('click', function () {
      var step = parseInt(button.getAttribute('data-qty-step'), 10);
      seatsEl.value = currentSeats() + step;
      seatsEl.value = currentSeats();   // re-clamp after the step
      refresh();
    });
  });

  /* If the deadline passes while the page is open — someone leaves a tab up
     over the evening of the 7th — the prices must change under them rather
     than letting them pay yesterday's rate. Checked once a minute; the switch
     itself is just refresh(), which repaints every figure at once. */
  if (!isNaN(EARLY_UNTIL)) {
    var wasEarly = isEarlyBird();
    window.setInterval(function () {
      var nowEarly = isEarlyBird();
      if (nowEarly !== wasEarly) { wasEarly = nowEarly; refresh(); }
    }, 60000);
  }

  /* ========================================================================
     04. THE PAYMENT QR

     images/upi-qr.png is the client's own code and carries the payee but NO
     amount — verified by decoding it — so a visitor scanning it on a desktop
     has to key the figure in by hand. On 2 Sept 2026 the client patched that
     by hand instead, sending two fixed QR images: am=3998 for two Vogue
     passes and am=2499 for one Elite. Right account, right figures — for
     exactly those two baskets, on exactly this side of 7 September.

     A picture cannot follow a running total. So the code is drawn here from
     the SAME upi:// string the "Open UPI App" button uses, which is the only
     arrangement in which the scanned amount and the tapped amount cannot
     drift apart: three Elite passes, or any basket at all after the venue is
     unveiled and standard pricing takes over, and both still agree.

     PROGRESSIVE, and deliberately so. The static image stays in the markup
     and is only hidden once a code has actually been painted. If js/qr.js is
     missing, or the browser has no canvas, the visitor still gets the
     client's own working QR — it simply asks them to type the amount, which
     is what the live page does today. A blank square would be worse.
     ======================================================================== */
  var qrCanvas = null;

  function paintQr(intent, state) {
    if (!qrHolder || !window.QR || !window.QR.paint) return;

    if (!qrCanvas) {
      if (!document.createElement('canvas').getContext) return;
      qrCanvas = document.createElement('canvas');
      qrCanvas.className = 'pay__qr-canvas';
      qrCanvas.setAttribute('role', 'img');
      qrHolder.insertBefore(qrCanvas, qrHolder.firstChild);
    }

    /* margin 2, not the spec's 4: the .pay__qr plate already puts 0.75rem of
       white all round the canvas, so the real quiet zone is comfortably over
       four modules. Spending them here instead buys about 7% more pixels per
       module, which is what a phone camera actually needs from a 49-module
       code shown at 14rem. */
    if (!window.QR.paint(qrCanvas, intent, { target: 600, margin: 2 })) {
      // Could not encode — leave the client's static code showing.
      if (qrCanvas.parentNode) qrCanvas.parentNode.removeChild(qrCanvas);
      qrCanvas = null;
      return;
    }

    var amount = rupees(state.total);
    qrCanvas.setAttribute('aria-label',
      'UPI QR code to pay ' + amount + ' to ' + UPI_PAYEE +
      ', UPI ID ' + UPI_ID + '. ' + state.seats + ' ' + state.name +
      (state.seats === 1 ? ' pass.' : ' passes.'));

    if (qrImage) qrImage.hidden = true;
    if (qrCap) {
      qrCap.textContent = 'Scan with any UPI app — ' + amount +
                          ' already filled in';
    }
  }

  /* ========================================================================
     05. COPY THE UPI ID
     The button ships hidden and is only revealed once we know the clipboard
     API is actually there — a visible Copy button that does nothing is worse
     than no button. Nothing is lost without it: the ID beside it is ordinary
     selectable text.
     ======================================================================== */
  var copyBtn = $('#upi-copy');
  if (copyBtn && navigator.clipboard && navigator.clipboard.writeText) {
    copyBtn.hidden = false;
    copyBtn.addEventListener('click', function () {
      var source = document.getElementById(copyBtn.getAttribute('data-copy-target'));
      if (!source) return;
      navigator.clipboard.writeText(source.textContent.trim()).then(function () {
        copyBtn.textContent = 'Copied';
        copyBtn.classList.add('is-done');
        window.setTimeout(function () {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('is-done');
        }, 2000);
      })['catch'](function () {
        // Permission denied, or an insecure context. Say so rather than
        // pretending it worked.
        copyBtn.textContent = 'Select it';
      });
    });
  }

  /* ========================================================================
     06. VALIDATION
     Same shape as the enquiry form in section 07 of js/script.js: a rule per
     field name, returning a message to mark it invalid and '' to pass. The
     error paragraphs use data-book-error rather than data-error-for so the two
     forms can never collide if they ever share a page.
     ======================================================================== */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  var rules = {
    'guest-name': function (value) {
      if (!value) return 'Please give us the name for the door list.';
      if (value.length < 2) return 'Please enter at least 2 characters.';
      return '';
    },
    'guest-phone': function (value) {
      if (!value) return 'We confirm your seat on WhatsApp, so we need a number.';
      // Ten digits is a full Indian mobile; a country code pushes it to twelve.
      // Anything shorter is a typo, not an unusual format.
      if (value.replace(/\D/g, '').length < 10) return 'Please enter a complete mobile number.';
      return '';
    },
    'guest-email': function (value) {
      if (!value) return 'We need an email address for your receipt.';
      if (!EMAIL_RE.test(value)) return 'Please check this email address — it looks incomplete.';
      return '';
    },
    seats: function (value) {
      var n = Number(value);
      if (!value || !isFinite(n) || Math.floor(n) !== n) return 'Please enter a whole number of passes.';
      var floor = minOf(currentPass());
      if (n < floor) {
        return floor > 1
          ? currentPass().value + ' is booked in pairs, so please choose at least ' + floor + '.'
          : 'Please reserve at least one pass.';
      }
      // Above ten this stops being self-service and becomes a Reserve enquiry,
      // which is a conversation with the desk rather than a form.
      if (n > 10) return 'For more than ten passes, please message the concierge desk.';
      return '';
    },
    utr: function (value) {
      if (!value) return 'Please enter the reference number from your UPI receipt.';
      // UPI reference numbers are usually twelve digits, but banks and apps do
      // vary, so this only rejects something too short to be a reference at
      // all rather than enforcing a format we cannot guarantee.
      if (value.replace(/\s/g, '').length < 6) return 'That looks too short — please check your receipt.';
      return '';
    }
  };

  function setError(input, message) {
    var wrapper = input.closest ? input.closest('.field') : null;
    var errorEl = $('[data-book-error="' + input.name + '"]');

    if (errorEl) errorEl.textContent = message;
    if (wrapper) wrapper.classList.toggle('has-error', Boolean(message));

    if (message) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  }

  function validateField(input) {
    // The confirmation tick is not a value to be checked but a box to be
    // ticked, so it gets its own branch rather than a rule.
    if (input.type === 'checkbox') {
      var missing = input.required && !input.checked
        ? 'Please confirm you have made the payment.'
        : '';
      setError(input, missing);
      return !missing;
    }

    var rule = rules[input.name];
    if (!rule) return true;

    var message = rule(String(input.value || '').trim());
    setError(input, message);
    return !message;
  }

  var fields = $$('input, select, textarea', form).filter(function (input) {
    return input.type !== 'radio';   // the tier always has one selected
  });

  fields.forEach(function (input) {
    input.addEventListener('blur', function () {
      if (String(input.value || '').trim() !== '' || input.hasAttribute('aria-invalid')) {
        validateField(input);
      }
    });
    input.addEventListener('input',  function () {
      if (input.hasAttribute('aria-invalid')) validateField(input);
    });
    input.addEventListener('change', function () {
      if (input.hasAttribute('aria-invalid')) validateField(input);
    });
  });

  /* ========================================================================
     07. SUBMIT — HAND THE RESERVATION TO WHATSAPP

     Same delivery model as the enquiry form, and the same limitation: this is
     a static site, so nothing is stored anywhere. The message opens in
     WhatsApp pre-typed and the visitor presses send. If the client later wires
     DELIVERY.endpoint in js/script.js to a form service, this form should be
     pointed at the same one — see the notes there.
     ======================================================================== */
  var summary = $('#book-summary');
  var success = $('#book-success');

  function buildMessage() {
    var s = state();
    var lines = [
      'RESERVATION — ' + EVENT,
      '',
      'Name: '     + $('#guest-name').value.trim(),
      'WhatsApp: ' + $('#guest-phone').value.trim(),
      'Email: '    + $('#guest-email').value.trim(),
      '',
      'Pass: '  + s.name + (s.early ? ' (early bird)' : ' (standard)'),
      'Passes: ' + s.seats + ' × ' + rupees(s.unit),
      'Total paid: ' + rupees(s.total),
      'UPI reference: ' + $('#utr').value.trim(),
      'Paid to: ' + UPI_ID,
      '',
      'Please confirm my pass.'
    ];
    return lines.join('\n');
  }

  function whatsappUrl() {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(buildMessage());
  }

  function showSuccess(mode) {
    $$('[data-book-success]', success).forEach(function (block) {
      block.hidden = block.getAttribute('data-book-success') !== mode;
    });
    // If WhatsApp never opened, the answers must stay on screen behind the
    // panel for the fallback link to be worth anything.
    form.classList.toggle('is-hidden', mode !== 'whatsapp-blocked');
    success.hidden = false;
    success.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center'
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();   // no backend — see the notes above

    var invalid = [];
    fields.forEach(function (input) {
      if (!validateField(input)) invalid.push(input);
    });

    if (invalid.length) {
      if (summary) {
        summary.textContent = invalid.length === 1
          ? 'One field needs your attention before we can send this.'
          : invalid.length + ' fields need your attention before we can send this.';
        summary.hidden = false;
      }
      invalid[0].focus({ preventScroll: false });
      return;
    }

    if (summary) {
      summary.hidden = true;
      summary.textContent = '';
    }

    var url = whatsappUrl();
    // Opened inside the submit handler so it counts as a user gesture; the
    // fallback panel carries the same link for the cases where it does not.
    var opened = window.open(url, '_blank', 'noopener');

    var link = $('#book-wa-link');
    if (link) link.href = url;

    showSuccess(opened ? 'whatsapp' : 'whatsapp-blocked');
  });

  refresh();
}());
