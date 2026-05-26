

(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', () => {
    const glassElements = document.querySelectorAll('.liquid-glass');
    
    document.addEventListener('mousemove', (e) => {
      glassElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        
        
        const dx = (e.clientX - cx) / (window.innerWidth * 0.5);
        const dy = (e.clientY - cy) / (window.innerHeight * 0.5);
        
        const sx = -dx * 3;
        const sy = -dy * 3;
        
        el.style.setProperty('--spec-x', `${sx}px`);
        el.style.setProperty('--spec-y', `${sy}px`);
      });
    });
  });
})();
