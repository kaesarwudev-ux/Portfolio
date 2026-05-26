

(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    let currentImages = [];
    let currentIndex = 0;

    if (galleryItems.length > 0 && lightbox) {
      galleryItems.forEach((img, index) => {
        currentImages.push(img.src);
        img.addEventListener('click', () => {
          if (lightboxImg) lightboxImg.src = img.src;
          currentIndex = index;
          lightbox.classList.add('active');
        });
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          lightbox.classList.remove('active');
        });
      }

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove('active');
        }
      });
    }
  });
})();
