

(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', () => {
    const glassElements = document.querySelectorAll('.liquid-glass');
    
    function updateSpecular(clientX, clientY) {
      glassElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = (clientX - cx) / (window.innerWidth * 0.5);
        const dy = (clientY - cy) / (window.innerHeight * 0.5);

        const sx = -dx * 3;
        const sy = -dy * 3;

        el.style.setProperty('--spec-x', `${sx}px`);
        el.style.setProperty('--spec-y', `${sy}px`);
      });
    }

    document.addEventListener('mousemove', (e) => {
      updateSpecular(e.clientX, e.clientY);
    });

    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        updateSpecular(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
  });
})();
