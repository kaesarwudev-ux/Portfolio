

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
          document.body.style.overflow = 'hidden';
        });
      });

      function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
      }

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
          closeLightbox();
        }
      });
    }
  });
})();
