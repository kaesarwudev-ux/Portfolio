

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const sgcnzImages = [
      '1000011167.jpg',
      '1000011168.jpg',
      '1000011173.jpg',
      '1000011183.jpg',
      '1000011196.jpg',
      '1000011199.jpg',
      '1000011208.jpg',
      '1000011301.jpg',
      '1000011302.jpg',
      '1000011304.jpg',
      '1000011313.jpg',
      '1000011317.jpg',
      '1000011318.jpg',
      '1000011326.jpg',
      '1000011331.jpg',
      '1000011340.jpg',
      '1000011349.jpg',
      '1000011350.jpg',
      '1000011411.jpg',
      '1000011418.jpg',
      '1000011421.jpg',
      '1000011430.heic',
      '1000011434.heic',
      '1000011439.heic',
      '1000011440.heic',
      '1000011441.heic',
      '1000011442.heic',
      '1000011443.heic',
      '1000011519.heic',
      '1000011533.heic',
      '1000011534.heic',
      '1000011553.jpg',
      '1000011568.heic',
      '1000011571.heic',
      '1000011572.heic',
      '1000011575.heic',
      '1000011733.jpg',
      '1000011800.jpg',
      '1000011806.jpg',
      '1000011820.jpg',
      '1000011842.jpg',
      '1000011843.jpg',
      '1000011845.jpg',
      '1000011846.jpg',
      '1000011854.jpg',
      '1000011857.jpg',
      '1000011870.jpg',
      '1000011882.jpg',
      '1000011886.jpg',
      '1000011887.jpg',
      '1000011970.jpg',
      '1000011986.jpg',
      '1000011988.jpg',
      '1000011992.jpg',
      '1000012025.jpg',
      '1000012027.jpg',
      '1000012028.jpg',
      '1000012046.jpg',
      '1000012073.jpg',
      '1000012080.jpg',
      '1000012085.jpg',
      '1000012088.jpg',
      '1000012093.jpg',
      '1000012100.jpg',
      '1000012252.jpg',
      '1000011120.heic',
      '1000011126.heic',
      '1000011127.heic',
      '1000011130.heic',
      '1000011149.heic',
      '1000011261.heic'
    ];

    const sgcnzFolder = document.getElementById('sgcnz-folder');
    const galleryHost = 'assets/img/SGCNZ%20Nationals%20photos';

    const galleryItems = document.querySelectorAll('.gallery-item:not(.folder-card) img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const closeBtn = document.querySelector('.close-btn');

    let currentImages = [];
    let currentIndex = 0;
    let dragStartX = 0;
    let isDragging = false;

    function refreshGalleryImages() {
      currentImages = Array.from(document.querySelectorAll('.gallery-item:not(.folder-card) img')).map((img) => img.src);
    }

    function openSgcNzFolder() {
      currentImages = sgcnzImages.map((filename) => `${galleryHost}/${filename}`);
      setLightboxImage(0);
      openLightbox();
    }

    function setLightboxImage(index, animationClass) {
      if (!lightboxImg || currentImages.length === 0) return;

      currentIndex = ((index % currentImages.length) + currentImages.length) % currentImages.length;
      const newSrc = currentImages[currentIndex];

      lightboxImg.classList.remove('slide-in-left', 'slide-in-right');
      lightboxImg.classList.add('is-loading');
      void lightboxImg.offsetWidth;

      const preloadImage = new Image();
      preloadImage.onload = () => {
        lightboxImg.src = newSrc;
        lightboxImg.classList.remove('is-loading');

        if (animationClass) {
          lightboxImg.classList.add(animationClass);
        }
      };
      preloadImage.onerror = () => {
        lightboxImg.classList.remove('is-loading');
        handleLightboxImageError();
      };
      preloadImage.src = newSrc;
    }

    function openLightbox(index) {
      if (!lightbox) return;
      if (typeof index === 'number') {
        refreshGalleryImages();
        setLightboxImage(index);
      }
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function handleLightboxImageError() {
      if (currentImages.length === 0) return;
      const failedIndex = currentIndex;
      currentImages.splice(failedIndex, 1);
      if (currentImages.length === 0) {
        closeLightbox();
        return;
      }
      if (failedIndex >= currentImages.length) {
        currentIndex = 0;
      }
      setLightboxImage(currentIndex);
    }

    if (lightboxImg) {
      lightboxImg.addEventListener('error', handleLightboxImageError);
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function showPrev() {
      setLightboxImage(currentIndex - 1, 'slide-in-left');
    }

    function showNext() {
      setLightboxImage(currentIndex + 1, 'slide-in-right');
    }

    if (galleryItems.length > 0 && lightbox) {
      refreshGalleryImages();

      galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
      });

      if (sgcnzFolder) {
        sgcnzFolder.addEventListener('click', openSgcNzFolder);
        sgcnzFolder.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openSgcNzFolder();
          }
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          showPrev();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          showNext();
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          closeLightbox();
        });
      }

      lightbox.addEventListener('click', (event) => {
        const outsideImage = event.target !== lightboxImg;
        const clickedNav = event.target.closest('.nav-btn');
        const clickedClose = event.target.closest('.close-btn');
        if (outsideImage && !clickedNav && !clickedClose) {
          closeLightbox();
        }
      });

      lightbox.addEventListener('pointerdown', (event) => {
        dragStartX = event.clientX;
        isDragging = true;
      });

      lightbox.addEventListener('pointermove', (event) => {
        if (!isDragging) return;
        dragDeltaX = event.clientX - dragStartX;
      });

      lightbox.addEventListener('pointerup', (event) => {
        if (!isDragging) return;
        isDragging = false;

        const dragDistance = event.clientX - dragStartX;
        if (Math.abs(dragDistance) > 60) {
          if (dragDistance < 0) {
            showNext();
          } else {
            showPrev();
          }
        }
      });

      lightbox.addEventListener('pointercancel', () => {
        isDragging = false;
      });

      document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('active')) return;

        if (event.key === 'Escape') {
          closeLightbox();
        }

        if (event.key === 'ArrowRight') {
          showNext();
        }

        if (event.key === 'ArrowLeft') {
          showPrev();
        }
      });
    }
  });
})();
