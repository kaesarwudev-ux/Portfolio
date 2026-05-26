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

      function getSwitchMetrics() {
        const switchRect = themeSwitch.getBoundingClientRect();
        const knobRect = themeKnob.getBoundingClientRect();
        const trackWidth = switchRect.width;
        const padding = 2;
        const knobNormal = knobRect.width;
        const knobExpanded = Math.round(trackWidth * 0.72);
        return { trackWidth, padding, knobNormal, knobExpanded };
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
        const m = getSwitchMetrics();
        const rect = themeSwitch.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const maxExpanded = m.trackWidth - m.knobExpanded - m.padding * 2;
        startX = e.clientX;
        startKnobX = Math.min(Math.max(clickX - m.knobExpanded / 2, 0), maxExpanded);
        themeSwitch.classList.add('dragging');
        themeSwitch.setPointerCapture(e.pointerId);
        themeKnob.style.width = m.knobExpanded + 'px';
        themeKnob.style.transform = `translateX(${startKnobX}px)`;
      });

      themeSwitch.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const m = getSwitchMetrics();
        const max = m.trackWidth - m.knobExpanded - m.padding * 2;
        const delta = e.clientX - startX;
        let newX = startKnobX + delta;
        newX = Math.max(0, Math.min(max, newX));
        themeKnob.style.transform = `translateX(${newX}px)`;
      });

      themeSwitch.addEventListener('pointerup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        themeSwitch.releasePointerCapture(e.pointerId);
        const m = getSwitchMetrics();
        const max = m.trackWidth - m.knobExpanded - m.padding * 2;
        const delta = e.clientX - startX;

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
