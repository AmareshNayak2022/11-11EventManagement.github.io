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
   04. Copy the UPI ID
   05. Validation
   06. Submit — hand the reservation to WhatsApp
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
  var EVENT     = '11:11 — The Debut, Sat 26 September 2026';

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
     03. LIVE TOTALS, THE SEAT STEPPER, AND THE UPI LINK

     One function recomputes everything the visitor can see about the price, so
     the summary, the pay panel, the confirmation checkbox and the UPI deep
     link can never drift out of step with each other. It runs on every change
     to either control.
     ======================================================================== */
  var tiers    = $$('input[name="tier"]', form);
  var seatsEl  = $('#seats', form);
  var upiLink  = $('#upi-link');

  function currentTier() {
    for (var i = 0; i < tiers.length; i++) {
      if (tiers[i].checked) return tiers[i];
    }
    return tiers[0];
  }

  // The seat count as an integer inside the input's own min/max, whatever the
  // visitor typed. A number input accepts "" and "-4" quite happily.
  function currentSeats() {
    var n = parseInt(seatsEl.value, 10);
    if (!isFinite(n)) n = 1;
    var min = parseInt(seatsEl.getAttribute('min'), 10) || 1;
    var max = parseInt(seatsEl.getAttribute('max'), 10) || 10;
    if (n < min) n = min;
    if (n > max) n = max;
    return n;
  }

  function state() {
    var tier  = currentTier();
    var unit  = parseInt(tier.getAttribute('data-price'), 10);
    var seats = currentSeats();
    return {
      name:  tier.value,
      unit:  unit,
      seats: seats,
      total: unit * seats
    };
  }

  function refresh() {
    var s = state();

    setText('tier',  s.name);
    setText('seats', String(s.seats));
    setText('unit',  rupees(s.unit));
    setText('total', rupees(s.total));
    setText('total-short', rupees(s.total));
    setText('breakdown',
      s.seats + (s.seats === 1 ? ' seat' : ' seats') +
      ' × ' + rupees(s.unit) + ' — ' + s.name);

    /* The saving is computed from the two tiers on the page rather than from a
       hardcoded 3000, so it stays right if either price moves. It is shown
       only when there is one — the standard tier saves nothing and a line
       reading "You save ₹0" would be worse than no line. */
    var saveEl = $('[data-book="saving"]');
    if (saveEl) {
      var top = 0;
      tiers.forEach(function (t) {
        var p = parseInt(t.getAttribute('data-price'), 10);
        if (p > top) top = p;
      });
      var saved = (top - s.unit) * s.seats;
      saveEl.textContent = saved > 0 ? 'You save ' + rupees(saved) : '';
      saveEl.hidden = saved <= 0;
    }

    /* The UPI intent, rebuilt from scratch each time.

       am= must be a plain decimal with two places — "2999.00", never "₹2,999"
       and never "2,999.00", both of which UPI apps reject or silently drop.
       Note that a plain (unsigned) upi:// intent PRE-FILLS the amount but does
       not lock it: the payer can still edit the figure in their app. That is
       exactly why step 05 asks for the reference number and a person checks
       it against the account — the page never assumes the right amount
       arrived. */
    if (upiLink) {
      upiLink.href =
        'upi://pay' +
        '?pa=' + encodeURIComponent(UPI_ID) +
        '&pn=' + encodeURIComponent(UPI_PAYEE) +
        '&cu=INR' +
        '&am=' + s.total.toFixed(2) +
        '&tn=' + encodeURIComponent('1111 Debut 26Sep ' + s.seats + ' seat');
    }
  }

  tiers.forEach(function (t) { t.addEventListener('change', refresh); });
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

  /* ========================================================================
     04. COPY THE UPI ID
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
     05. VALIDATION
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
      if (!value || !isFinite(n) || Math.floor(n) !== n) return 'Please enter a whole number of seats.';
      if (n < 1) return 'Please reserve at least one seat.';
      if (n > 10) return 'For more than ten seats, please message the concierge desk.';
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
     06. SUBMIT — HAND THE RESERVATION TO WHATSAPP

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
      'Admission: ' + s.name,
      'Seats: '     + s.seats + ' × ' + rupees(s.unit),
      'Total paid: ' + rupees(s.total),
      'UPI reference: ' + $('#utr').value.trim(),
      'Paid to: ' + UPI_ID,
      '',
      'Please confirm my seat.'
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
