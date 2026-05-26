(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const themeKnob = themeSwitch
      ? themeSwitch.querySelector('.apple-switch-knob')
      : null;

    if (themeSwitch && themeKnob) {
      let isDragging = false;
      let startX = 0;
      let startKnobX = 0;
      const trackWidth = 56;
      const knobNormal = 28;
      const knobExpanded = 40;
      const padding = 2;

      function getMaxTravel(knobW) {
        return trackWidth - knobW - padding * 2;
      }

      function isLight() {
        return document.documentElement.getAttribute('data-theme') === 'light';
      }

      function setTheme(newTheme, animate) {
        if (animate) themeSwitch.classList.remove('dragging');
        document.body.style.transition =
          'background-color 0.4s ease, color 0.4s ease';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeKnob.style.transform = '';
        themeKnob.style.width = '';
      }

      themeSwitch.addEventListener('pointerdown', (e) => {
        isDragging = true;
        const rect = themeSwitch.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const maxExpanded = getMaxTravel(knobExpanded);
        startX = e.clientX;
        startKnobX = Math.min(Math.max(clickX - knobExpanded / 2, 0), maxExpanded);
        themeSwitch.classList.add('dragging');
        themeSwitch.setPointerCapture(e.pointerId);
        themeKnob.style.width = knobExpanded + 'px';
        themeKnob.style.transform = `translateX(${startKnobX}px)`;
      });

      themeSwitch.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const delta = e.clientX - startX;
        const max = getMaxTravel(knobExpanded);
        let newX = startKnobX + delta;
        newX = Math.max(0, Math.min(max, newX));
        themeKnob.style.transform = `translateX(${newX}px)`;
      });

      themeSwitch.addEventListener('pointerup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        themeSwitch.releasePointerCapture(e.pointerId);
        const delta = e.clientX - startX;
        const max = getMaxTravel(knobExpanded);

        if (Math.abs(delta) < 4) {
          setTheme(isLight() ? 'dark' : 'light', true);
          return;
        }

        const finalX = startKnobX + delta;
        setTheme(finalX > max / 2 ? 'light' : 'dark', true);
      });

      themeSwitch.addEventListener('pointercancel', () => {
        if (!isDragging) return;
        isDragging = false;
        themeSwitch.classList.remove('dragging');
        themeKnob.style.transform = '';
        themeKnob.style.width = '';
      });
    }
  });
})();
