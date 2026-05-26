

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', async () => {
    
    const filterContainer = document.getElementById('svg-filters-container');
    if (filterContainer) {
      try {
        const response = await fetch('filters.svg');
        const svgText = await response.text();
        filterContainer.innerHTML = svgText;
      } catch (err) {
        console.error('Failed to load filters:', err);
      }
    }

    
    
    const convex = createDisplacementMapImage(256, 256, 'convexSquircle', 0.4, 1.5, 75);
    const lip = createDisplacementMapImage(256, 256, 'lip', 0.5, 1.5, 60);

    const convexImg = document.getElementById('map-convex');
    if (convexImg) {
      convexImg.setAttribute('href', convex.dataUrl);
    }

    const lipImg = document.getElementById('map-lip');
    if (lipImg) {
      lipImg.setAttribute('href', lip.dataUrl);
    }

    
    const convexFilter = document.querySelector('#filter-convex feDisplacementMap');
    if (convexFilter) {
      
      let scale = 40;
      
      
      
      
      const navGlass = document.querySelector('.nav-glass');
      if (navGlass) {
        const height = navGlass.offsetHeight;
        if (height > 0 && height < 120) {
          
          scale = Math.min(scale, Math.floor(height * 0.3));
        }
      }
      convexFilter.setAttribute('scale', String(scale));
    }
    
    const lipFilter = document.querySelector('#filter-lip feDisplacementMap');
    if (lipFilter) {
      lipFilter.setAttribute('scale', '25');
    }
  });
})();
