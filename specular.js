

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const glassElements = Array.from(document.querySelectorAll('.liquid-glass'));
    if (glassElements.length === 0) return;

    const rects = [];
    function updateRects() {
      rects.length = 0;
      glassElements.forEach((el) => rects.push(el.getBoundingClientRect()));
    }

    let pendingFrame = false;
    let latestX = 0;
    let latestY = 0;

    function applySpecular() {
      const widthFactor = window.innerWidth * 0.5;
      const heightFactor = window.innerHeight * 0.5;

      glassElements.forEach((el, index) => {
        const rect = rects[index];
        if (!rect) return;

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (latestX - cx) / widthFactor;
        const dy = (latestY - cy) / heightFactor;
        const sx = -dx * 3;
        const sy = -dy * 3;

        el.style.setProperty('--spec-x', `${sx}px`);
        el.style.setProperty('--spec-y', `${sy}px`);
      });

      pendingFrame = false;
    }

    function scheduleSpecular(x, y) {
      latestX = x;
      latestY = y;
      if (!pendingFrame) {
        pendingFrame = true;
        requestAnimationFrame(applySpecular);
      }
    }

    document.addEventListener('mousemove', (e) => {
      scheduleSpecular(e.clientX, e.clientY);
    });

    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        scheduleSpecular(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('resize', updateRects, { passive: true });
    window.addEventListener('scroll', updateRects, { passive: true });
    updateRects();
  });
})();
