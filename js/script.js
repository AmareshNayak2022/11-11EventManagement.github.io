/* ==========================================================================
   11:11 — Elevenn Elevenn Archive Pvt Ltd — site behaviour
   Vanilla JavaScript only. No libraries, no build step.

   CONTENTS
   01. Helpers
   02. Sticky header state + header height measurement
   03. Mobile navigation (open, close, focus trap, keyboard)
   04. Smooth anchor scrolling
   05. Scroll reveal (IntersectionObserver)
   06. Active navigation link
   07. Contact form validation + success state
   ========================================================================== */

(function () {
  'use strict';

  /* ========================================================================
     01. HELPERS
     ======================================================================== */
  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function prefersReducedMotion() { return motionQuery.matches; }

  /* ========================================================================
     02. STICKY HEADER
     The header is transparent over the hero and picks up an ivory background
     once the page scrolls. We also publish the real header height to CSS so
     `scroll-margin-top` stays accurate at every breakpoint.
     ======================================================================== */
  var header = $('[data-header]');

  function syncHeaderHeight() {
    if (!header) return;
    document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }

  function syncHeaderState() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  /* ========================================================================
     03. MOBILE NAVIGATION
     ======================================================================== */
  var navToggle = $('#nav-toggle');
  var mobileNav = $('#mobile-nav');
  var navPanel  = mobileNav ? $('.mobile-nav__panel', mobileNav) : null;
  var navIsOpen = false;
  var closeTimer = null;

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), ' +
                  'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openNav() {
    if (!mobileNav || navIsOpen) return;
    navIsOpen = true;
    window.clearTimeout(closeTimer);

    mobileNav.hidden = false;
    document.body.classList.add('is-locked');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation menu');

    // Let the browser paint the un-hidden panel before transitioning it in.
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        mobileNav.classList.add('is-open');
      });
    });

    var firstLink = $('.mobile-nav__list a', mobileNav);
    if (firstLink) firstLink.focus({ preventScroll: true });

    document.addEventListener('keydown', onNavKeydown);
  }

  function closeNav(returnFocus) {
    if (!mobileNav || !navIsOpen) return;
    navIsOpen = false;

    mobileNav.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    document.removeEventListener('keydown', onNavKeydown);

    if (returnFocus) navToggle.focus({ preventScroll: true });

    // Keep the panel in the DOM until the slide-out transition finishes,
    // then hide it from assistive technology and the tab order.
    var delay = prefersReducedMotion() ? 0 : 600;
    closeTimer = window.setTimeout(function () {
      if (!navIsOpen) mobileNav.hidden = true;
    }, delay);
  }

  function onNavKeydown(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      closeNav(true);
      return;
    }

    if (event.key !== 'Tab' || !navPanel) return;

    // Trap focus inside the open panel.
    var items = $$(FOCUSABLE, navPanel).filter(function (el) {
      return el.offsetParent !== null;
    });
    if (!items.length) return;

    var first = items[0];
    var last  = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      if (navIsOpen) { closeNav(true); } else { openNav(); }
    });

    // Backdrop and the explicit close button
    $$('[data-nav-close]', mobileNav).forEach(function (el) {
      el.addEventListener('click', function () { closeNav(true); });
    });

    // Close as soon as a destination is chosen
    $$('.mobile-nav__list a, .mobile-nav__foot a', mobileNav).forEach(function (link) {
      link.addEventListener('click', function () { closeNav(false); });
    });
  }

  /* ========================================================================
     04. SMOOTH ANCHOR SCROLLING
     `scroll-margin-top` in the stylesheet handles the sticky-header offset.
     ======================================================================== */
  $$('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;

      var target = document.getElementById(id.slice(1));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start'
      });

      // Keep the URL shareable without triggering a second jump.
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', id);
      }

      // Move keyboard focus to the destination so tabbing continues there.
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', function handler() {
        target.removeAttribute('tabindex');
        target.removeEventListener('blur', handler);
      });
    });
  });

  /* ========================================================================
     05. SCROLL REVEAL
     ======================================================================== */
  var revealItems = $$('[data-reveal]');

  function revealAll() {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  }

  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    revealAll();
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // reveal once, then stop watching
      });
    }, {
      root: null,
      // The trigger line sits 10% above the viewport bottom, so an element
      // reveals just after it starts entering. threshold 0 (rather than a
      // percentage of the element) keeps this reliable for blocks that are
      // taller than the viewport, which would otherwise never reach a
      // fractional threshold and would stay invisible.
      rootMargin: '0px 0px -10% 0px',
      threshold: 0
    });

    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ========================================================================
     06. ACTIVE NAVIGATION LINK
     ======================================================================== */
  var navLinks = $$('.nav-desktop .nav-link');
  var sectionIds = navLinks
    .map(function (link) { return link.getAttribute('href'); })
    .filter(function (href) { return href && href.charAt(0) === '#'; })
    .map(function (href) { return href.slice(1); });

  var watched = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (watched.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });

    watched.forEach(function (section) { spy.observe(section); });
  }

  /* ========================================================================
     07. CONTACT FORM
     --------------------------------------------------------------------
     HOW A SUBMITTED ENQUIRY REACHES YOU

     A static site cannot send email by itself — there is no server to do the
     sending. Something has to receive the POST. There are two modes here, and
     which one runs depends solely on DELIVERY.endpoint below.

     MODE 1 — WhatsApp (active now, nothing to sign up for)
       Leave DELIVERY.endpoint as ''. On submit, the answers are formatted into
       a message and WhatsApp opens with it pre-typed, addressed to
       DELIVERY.whatsapp. The visitor presses send; it arrives as a normal
       WhatsApp message.
       Trade-off: the visitor must have WhatsApp, and they must press send —
       if they change their mind at that point, you never see the enquiry.

     MODE 2 — Email via a form service (set an endpoint and this takes over)
       Formspree is the quickest: create a form at https://formspree.io, copy
       the endpoint, and paste it into DELIVERY.endpoint. Submissions are then
       POSTed there and forwarded to whatever inbox you registered. Free tier
       covers roughly 50 a month.
       Netlify Forms instead: deploy to Netlify, add `netlify` and
       `name="inquiry"` to the <form> element in index.html, and Netlify
       captures the POST on its own.
       Your own API: same as Formspree, pointing at your URL.

     Whichever you use, validate on the server too — the checks in this file
     are a convenience for the visitor, never a security boundary. And note
     that both modes put the enquiry in front of you, but neither stores it:
     if you want a record, use a service that keeps submissions.
     ==================================================================== */
  var DELIVERY = {
    // Paste a Formspree/Netlify/your-own URL here to switch to email delivery.
    // Route submissions to enquiries@1111events.in — the client's stated
    // enquiry inbox, which is NOT the same as concierge@1111events.in shown on
    // the page. The Lead Curator and Ops Head are to be copied on every brief.
    endpoint: '',
    // International format, digits only — no plus sign, spaces, or dashes.
    // The concierge desk line +91 99381 20356, which is also the WhatsApp
    // account. It appears in two more places: the contact block and the
    // floating button, both in index.html. Change it in all three or none.
    whatsapp: '919938120356'
  };

  var form        = $('#inquiry-form');
  var formSuccess = $('#form-success');
  var formSummary = $('#form-summary');
  var formReset   = $('#form-reset');

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  /* Field name -> validator. Returning a string marks the field invalid; a
     field with no entry here always passes, which is how the optional ones
     (`intent`, `vision`) get through without a rule of their own.

     Which fields are required is the client's decision, not a UX guess: the
     brief (Q41) marks name, client type, target date, budget, location and
     guest count as essential, and artist/venue vision as optional. `email` is
     required on top of that list because a brief with no reply address cannot
     be answered. */
  var rules = {
    name: function (value) {
      if (!value) return 'Please tell us your name and organisation.';
      if (value.length < 2) return 'Please enter at least 2 characters.';
      return '';
    },
    email: function (value) {
      if (!value) return 'We need an email address to reply to you.';
      if (!EMAIL_RE.test(value)) return 'Please check this email address — it looks incomplete.';
      return '';
    },
    phone: function (value) {
      if (!value) return ''; // optional
      var digits = value.replace(/\D/g, '');
      if (digits.length < 7) return 'Please enter a complete phone number, or leave this blank.';
      return '';
    },
    'client-type': function (value) {
      if (!value) return 'Please tell us which of these describes you.';
      return '';
    },
    'event-date': function (value) {
      if (!value) return 'Please give us a target date — the first of the month is fine.';
      var chosen = new Date(value + 'T00:00:00');
      if (isNaN(chosen.getTime())) return 'Please choose a valid date.';
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) return 'Please choose a date in the future.';
      return '';
    },
    budget: function (value) {
      if (!value) return 'Please choose a budget range, or "Not yet decided".';
      return '';
    },
    location: function (value) {
      if (!value) return 'Please tell us where — a city or region is enough.';
      return '';
    },
    guests: function (value) {
      if (!value) return 'Please give us a rough guest count.';
      var count = Number(value);
      if (!isFinite(count) || Math.floor(count) !== count) return 'Please enter a whole number.';
      if (count < 1) return 'Please enter at least 1 guest.';
      // The ceiling covers the largest format the company runs (full-scale
      // concert production); anything beyond it is likelier to be a typo.
      if (count > 50000) return 'Please enter a number under 50,000, or tell us below.';
      return '';
    }
  };

  function fieldWrapper(input) {
    return input.closest ? input.closest('.field') : null;
  }

  function setError(input, message) {
    var wrapper = fieldWrapper(input);
    var errorEl = $('[data-error-for="' + input.name + '"]');

    if (errorEl) errorEl.textContent = message;
    if (wrapper) wrapper.classList.toggle('has-error', Boolean(message));

    if (message) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  }

  function validateField(input) {
    var rule = rules[input.name];
    if (!rule) return true;

    var message = rule(String(input.value || '').trim());
    setError(input, message);
    return !message;
  }

  /* `mode` selects which explanation the panel shows: 'whatsapp',
     'whatsapp-blocked', or 'email'. Each lives in the panel as an element with
     a matching data-success attribute; the rest stay hidden. */
  function showSuccess(mode) {
    if (!form || !formSuccess) return;

    $$('[data-success]', formSuccess).forEach(function (block) {
      block.hidden = block.getAttribute('data-success') !== mode;
    });

    // If WhatsApp did not open, the answers are still on screen and must stay
    // reachable, so the form is left visible behind the panel.
    form.classList.toggle('is-hidden', mode !== 'whatsapp-blocked');
    formSuccess.hidden = false;

    if (!prefersReducedMotion()) {
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  if (form) {
    var inputs = $$('input, select, textarea', form);

    // Re-validate a field once it has already been flagged, so the error
    // clears the moment the visitor fixes it.
    inputs.forEach(function (input) {
      input.addEventListener('blur', function () {
        if (String(input.value || '').trim() !== '' || input.hasAttribute('aria-invalid')) {
          validateField(input);
        }
      });

      input.addEventListener('input', function () {
        if (input.hasAttribute('aria-invalid')) validateField(input);
      });

      input.addEventListener('change', function () {
        if (input.hasAttribute('aria-invalid')) validateField(input);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault(); // no backend yet — see the notes above

      var invalid = [];

      inputs.forEach(function (input) {
        if (!validateField(input)) invalid.push(input);
      });

      if (invalid.length) {
        if (formSummary) {
          formSummary.textContent = invalid.length === 1
            ? 'One field needs your attention before we can send this.'
            : invalid.length + ' fields need your attention before we can send this.';
          formSummary.hidden = false;
        }
        invalid[0].focus({ preventScroll: false });
        return;
      }

      if (formSummary) {
        formSummary.hidden = true;
        formSummary.textContent = '';
      }

      /* --------------------------------------------------------------
         Validation passed. Hand off to whichever delivery mode is
         configured — see the notes at the top of this section.
         -------------------------------------------------------------- */
      if (DELIVERY.endpoint) {
        sendToEndpoint();
      } else {
        sendToWhatsApp();
      }
    });
  }

  /* Builds the WhatsApp message from the form's own labels, so it stays
     correct if fields are renamed, added, or removed later — nothing here
     hard-codes the current field names. */
  // Collapses the whitespace and the required-marker out of a <label> or
  // <legend> so it reads as a plain heading inside a WhatsApp message.
  function tidy(text) {
    return String(text || '').replace('*', '').replace(/\s+/g, ' ').trim();
  }

  function buildMessage() {
    var lines  = ['New enquiry from the 11:11 website', ''];
    var groups = {};  // legend text -> the labels of the boxes ticked under it
    var order  = [];  // keeps those groups in the order they appear in the form

    inputs.forEach(function (input) {
      /* A checkbox group arrives as one <input> per option, so the boxes are
         collected here and emitted as a single line below rather than one line
         each. Note the filter is `checked`, not emptiness: an unticked box
         still carries its `value`, so the ordinary blank test would let every
         option through. */
      if (input.type === 'checkbox') {
        if (!input.checked) return;

        var group  = input.closest ? input.closest('fieldset') : null;
        var legend = group ? group.querySelector('legend') : null;
        var key    = legend ? tidy(legend.textContent) : input.name;

        if (!groups[key]) { groups[key] = []; order.push(key); }
        groups[key].push(input.value);
        return;
      }

      var value = (input.value || '').trim();
      if (!value) return; // skip anything left blank

      // The long-form answer is held back for its own block at the end.
      if (input.tagName === 'TEXTAREA') return;

      var label = form.querySelector('label[for="' + input.id + '"]');
      lines.push(tidy(label ? label.textContent : input.name) + ': ' + value);
    });

    order.forEach(function (key) {
      lines.push(key + ': ' + groups[key].join(', '));
    });

    var vision = form.querySelector('textarea');
    if (vision && vision.value.trim()) {
      var visionLabel = form.querySelector('label[for="' + vision.id + '"]');
      lines.push('', tidy(visionLabel ? visionLabel.textContent : 'Notes') + ':', vision.value.trim());
    }

    return lines.join('\n');
  }

  function whatsappUrl() {
    return 'https://wa.me/' + DELIVERY.whatsapp +
           '?text=' + encodeURIComponent(buildMessage());
  }

  function sendToWhatsApp() {
    var url = whatsappUrl();

    // Opened inside the submit handler, so it counts as a user gesture and is
    // normally allowed. If a blocker stops it anyway, the success panel below
    // carries the same link as a fallback the visitor can click directly.
    var opened = window.open(url, '_blank', 'noopener');

    var link = $('#form-wa-link');
    if (link) link.href = url;

    showSuccess(opened ? 'whatsapp' : 'whatsapp-blocked');
    // The form is deliberately NOT reset here: if WhatsApp failed to open, the
    // visitor's answers must still be on screen for the fallback link to mean
    // anything.
  }

  function sendToEndpoint() {
    var button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending…';
    }

    window.fetch(DELIVERY.endpoint, {
      method: 'POST',
      body: new window.FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed: ' + res.status);
        showSuccess('email');
        form.reset();
        inputs.forEach(function (input) { setError(input, ''); });
      })
      .catch(function () {
        if (formSummary) {
          formSummary.textContent =
            'Sorry — that did not send. Please try again, or reach us on WhatsApp.';
          formSummary.hidden = false;
        }
      })
      .then(function () {
        if (button) {
          button.disabled = false;
          button.textContent = 'Send Inquiry';
        }
      });
  }

  if (formReset && form && formSuccess) {
    formReset.addEventListener('click', function () {
      formSuccess.hidden = true;
      form.classList.remove('is-hidden');

      var firstField = $('#name');
      if (firstField) {
        firstField.focus({ preventScroll: true });
        form.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  }

  /* ========================================================================
     GLOBAL LISTENERS
     ======================================================================== */
  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(function () {
      syncHeaderState();
      scrollTicking = false;
    });
  }, { passive: true });

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      syncHeaderHeight();
      // The hamburger disappears at this width, so close the panel with it.
      if (navIsOpen && window.innerWidth >= 960) closeNav(false);
    }, 150);
  });

  // Fonts load after first paint and can change the header height slightly.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncHeaderHeight);
  }

  syncHeaderHeight();
  syncHeaderState();
})();