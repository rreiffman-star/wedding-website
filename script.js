/* ————— Ross & Stephanie · Venice MMXXVI ————— */

(function () {
  'use strict';

  var PASSWORD = 'stephross2026';
  var GATE_KEY = 'rs-venice-gate';
  var RSVP_ENDPOINT = 'https://formsubmit.co/ajax/rreiffman@gmail.com';

  var gate = document.getElementById('gate');
  var site = document.getElementById('site');

  /* ——— password gate ——— */

  function openGate() {
    site.hidden = false;
    gate.classList.add('gate-out');
    setTimeout(function () { gate.remove(); }, 1000);
    watchReveals();
  }

  if (sessionStorage.getItem(GATE_KEY) === 'open') {
    openGate();
  } else {
    document.getElementById('gate-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('gate-input');
      if (input.value.trim().toLowerCase() === PASSWORD) {
        sessionStorage.setItem(GATE_KEY, 'open');
        openGate();
      } else {
        gate.classList.remove('gate-shake');
        void gate.offsetWidth; /* restart animation */
        gate.classList.add('gate-shake');
        input.select();
      }
    });
  }

  /* ——— reveal on scroll ——— */

  function watchReveals() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ——— rsvp form ——— */

  var form = document.getElementById('rsvp-form');
  var submitBtn = document.getElementById('rsvp-submit');
  var status = document.getElementById('rsvp-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    if (data.get('_honey')) return; /* bot */

    var payload = {
      _subject: 'Wedding RSVP — ' + data.get('name'),
      _template: 'table',
      _captcha: 'false',
      'Name(s)': data.get('name'),
      'Email': data.get('email'),
      'Attending': data.get('attending'),
      'Guests': data.get('guests'),
      'Note': data.get('note') || '—'
    };

    submitBtn.disabled = true;
    status.classList.remove('err');
    status.textContent = 'Sending…';

    fetch(RSVP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('bad status');
        return res.json();
      })
      .then(function () {
        form.querySelectorAll('.field, .rsvp-submit').forEach(function (el) {
          el.style.display = 'none';
        });
        status.textContent =
          data.get('attending') === 'Joyfully accepts'
            ? 'Grazie mille — we can’t wait to see you on the lagoon.'
            : 'Thank you for letting us know — you will be missed.';
      })
      .catch(function () {
        submitBtn.disabled = false;
        status.classList.add('err');
        status.innerHTML =
          'Something went adrift. Please try again, or email us at ' +
          '<a href="mailto:rreiffman@gmail.com?subject=Wedding%20RSVP">rreiffman@gmail.com</a>.';
      });
  });
})();
