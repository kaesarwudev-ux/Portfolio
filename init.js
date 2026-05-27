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

  /* ── Displacement maps & filters (waits for DOMContentLoaded) ── */
  document.addEventListener('DOMContentLoaded', function() {
    var filterContainer = document.getElementById('svg-filters-container');
    if (filterContainer) {
      fetch('filters.svg')
        .then(function(response) { return response.text(); })
        .then(function(svgText) { filterContainer.innerHTML = svgText; })
        .catch(function(err) { console.error('Failed to load filters:', err); });
    }

    try {
      var convex = createDisplacementMapImage(256, 256, 'convexSquircle', 0.4, 1.5, 75);
      var lip = createDisplacementMapImage(256, 256, 'lip', 0.5, 1.5, 60);

      var convexImg = document.getElementById('map-convex');
      if (convexImg) {
        convexImg.setAttribute('href', convex.dataUrl);
      }

      var lipImg = document.getElementById('map-lip');
      if (lipImg) {
        lipImg.setAttribute('href', lip.dataUrl);
      }

      var convexFilter = document.querySelector('#filter-convex feDisplacementMap');
      if (convexFilter) {
        var scale = 40;
        var navGlass = document.querySelector('.nav-glass');
        if (navGlass) {
          var height = navGlass.offsetHeight;
          if (height > 0 && height < 120) {
            scale = Math.min(scale, Math.floor(height * 0.3));
          }
        }
        convexFilter.setAttribute('scale', String(scale));
      }

      var lipFilter = document.querySelector('#filter-lip feDisplacementMap');
      if (lipFilter) {
        lipFilter.setAttribute('scale', '25');
      }
    } catch (err) {
      console.error('Displacement map init failed:', err);
    }
  });
})();
