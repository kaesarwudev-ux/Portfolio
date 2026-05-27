(function() {
  'use strict';

  /* ── Mobile nav toggle (runs immediately, outside DOMContentLoaded) ── */
  (function() {
    var navToggle = document.getElementById('mobile-nav-toggle');
    var navLinks = document.getElementById('nav-links');
    var navEl = document.querySelector('nav');
    if (!navToggle || !navLinks || !navEl) return;

    function openMenu() {
      navEl.classList.add('open');
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      navEl.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', function() {
      if (navEl.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', closeMenu);
    }
  })();

  /* ── Adjust displacement scale based on nav height ── */
  document.addEventListener('DOMContentLoaded', function() {
    var navGlass = document.querySelector('.nav-glass');
    if (!navGlass) return;
    var h = navGlass.offsetHeight;
    if (h <= 0 || h >= 120) return;
    var scale = Math.min(14, Math.floor(h * 0.25));
    var disp = document.getElementById('disp-convex');
    if (disp) disp.setAttribute('scale', String(scale));
    var disp2 = document.getElementById('disp-lip');
    if (disp2) disp2.setAttribute('scale', String(Math.max(4, Math.floor(scale * 1.2))));
  });
})();
