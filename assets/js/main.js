// main.js - Core interactions, palette, easter eggs, session state
document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);

  // 1. Typing Effect
  const typeTarget = $('#typing-text');
  if (typeTarget) {
    const msg = 'hello, i am the biggest Max Verstappen Fan Ever';
    let i = 0; const speed = 35;
    const type = () => { if (i < msg.length) { typeTarget.textContent += msg.charAt(i); i++; setTimeout(type, speed); } };
    type();
  }

  // 2. Scroll Reveals
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'translateY(0)'; observer.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '-50px' });
  $$('article, .focus-item, .section-title').forEach(el => { el.style.opacity = 0; el.style.transform = 'translateY(12px)'; el.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; observer.observe(el); });

  // 3. Command Palette (Ctrl/Cmd + K)
  const palette = $('#command-palette');
  const paletteBtn = $('#palette-trigger');
  const results = $('#palette-results');
  const routes = [
    { name: 'Home', path: 'index.html', anchor: '#hero-heading' },
    { name: 'About', path: 'about.html', anchor: '#bio-heading' },
    { name: 'Projects', path: 'projects.html', anchor: '#archive-heading' },
    { name: 'Contact', path: 'contact.html', anchor: '#contact-heading' }
  ];

  const openPalette = () => { if(palette) { palette.showModal(); results.innerHTML = ''; routes.forEach(r => { results.innerHTML += `<li class="palette-item" tabindex="0" data-path="${r.path}">${r.name} <span class="path">${r.path}</span></li>`; }); results.querySelector('.palette-item').focus(); } };
  const closePalette = () => { if(palette) palette.close(); };
  if(paletteBtn) paletteBtn.addEventListener('click', openPalette);
  document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); palette?.open ? closePalette() : openPalette(); } if (e.key === 'Escape') closePalette(); });
  if(results) {
    results.addEventListener('click', e => { if(e.target.dataset.path) window.location.href = e.target.dataset.path; });
    results.addEventListener('keydown', e => {
      const items = [...results.querySelectorAll('.palette-item')];
      const focusIdx = items.findIndex(i => i === document.activeElement);
      if(e.key === 'ArrowDown') { items[Math.min(focusIdx+1, items.length-1)]?.focus(); e.preventDefault(); }
      if(e.key === 'ArrowUp') { items[Math.max(focusIdx-1, 0)]?.focus(); e.preventDefault(); }
      if(e.key === 'Enter') document.activeElement.click();
    });
  }

  // 4. Magnetic Hover (GPU accelerated)
  if (window.matchMedia('(pointer: fine)').matches) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => { const rect = el.getBoundingClientRect(); const x = e.clientX - rect.left - rect.width/2; const y = e.clientY - rect.top - rect.height/2; el.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0)`; });
      el.addEventListener('mouseleave', () => { el.style.transform = 'translate3d(0,0,0)'; });
    });
  }

  // 5. Decode Scramble
  const glyphs = '█▓▒░@#&?';
  $$('.decode-hover').forEach(el => {
    const original = el.dataset.text || el.textContent;
    el.dataset.text = original;
    el.addEventListener('mouseenter', () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let i = 0; const len = original.length;
      const scramble = setInterval(() => {
        let out = '';
        for (let j = 0; j < len; j++) out += j < i ? original[j] : glyphs[Math.floor(Math.random()*glyphs.length)];
        el.textContent = out; i++;
        if (i > len) clearInterval(scramble);
      }, 40);
    });
  });

  // 6. Session Contact Animation
  const sessionHeader = $('.session-header');
  if (sessionHeader && !sessionStorage.getItem('contactSeen')) {
    sessionStorage.setItem('contactSeen', 'true');
    setTimeout(() => sessionHeader.classList.add('revealed'), 400);
  }

  // 7. Project Filters
  const filterBtns = $$('.filter-btn');
  const projectCards = $$('.project-card');
  if(filterBtns.length) {
    const activeFilter = sessionStorage.getItem('filter') || 'all';
    filterBtns.forEach(btn => { btn.setAttribute('aria-pressed', btn.dataset.filter === activeFilter); });
    const applyFilter = (f) => {
      projectCards.forEach(c => { c.classList.toggle('hidden', f !== 'all' && c.dataset.category !== f); });
      sessionStorage.setItem('filter', f);
      filterBtns.forEach(btn => btn.setAttribute('aria-pressed', btn.dataset.filter === f));
    };
    applyFilter(activeFilter);
    filterBtns.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));
  }

  // 8. Easter Eggs
  // Egg 1: Footer year hover (CSS handled)
  
  // Egg 2: Project count triple click -> 1d20 roll
  const eggCount = $('#project-count');
  if(eggCount) { let clicks = 0; let timer; eggCount.addEventListener('click', () => { clicks++; clearTimeout(timer); timer = setTimeout(() => clicks = 0, 2000); if (clicks === 3) console.log(`❯ roll 1d20: ${Math.floor(Math.random()*20)+1}`); }); }

  // Egg 3: Hidden env prompt
  const envInput = $('#env-input'); const envOutput = $('#env-output');
  if(envInput && envOutput) {
    envInput.setAttribute('tabindex', '-1'); envInput.style.pointerEvents = 'auto'; envInput.style.clipPath = 'none'; envInput.style.width = '200px'; envInput.style.opacity = '1'; envInput.style.marginTop = '1rem'; envInput.style.background = 'transparent'; envInput.style.border = '1px dashed var(--color-border)'; envInput.style.color = 'var(--color-text-dim)'; envInput.setAttribute('placeholder', 'hidden prompt');
    envInput.addEventListener('keyup', e => {
      if(e.key === 'Enter' && e.target.value.trim() === 'show env') {
        envOutput.innerHTML = `<div class="config-line"><span class="config-key">user:</span> <span class="config-val">kaesar_wu</span></div><div class="config-line"><span class="config-key">host:</span> <span class="config-val">macleans-college.local</span></div><div class="config-line"><span class="config-key">role:</span> <span class="config-val">junior-journalist / student-dev</span></div><div class="config-line"><span class="config-key">shell:</span> <span class="config-val">zsh</span></div><pre class="ascii-polar" style="margin-top:1rem;">⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⠴⠶⠾⠛⠛⠳⠶⠶⢤⣄⡀⠀⠀⠀⣀⣀⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⡶⣶⠲⣶⣴⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠳⣾⡋⠉⠉⠛⢷⡄⠀⠀⠀⠀
⠀⠀⠀⠀⢸⡋⠠⢶⣶⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⣿⡛⠂⢈⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠘⣧⢀⣾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡎⢿⣄⣿⠃⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠙⢿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢡⠈⡟⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⢀⣶⢿⣷⣦⠀⠀⠀⠀⣴⣾⢷⣦⡀⠀⠀⣸⠀⣿⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⡄⠀⠀⠀⠀⠀⠉⠀⠀⠋⠀⠀⠀⠀⠉⠀⠀⠈⠁⠀⢀⡏⢀⡟⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⢿⡄⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣄⠀⠀⠀⠀⠀⠀⡾⠀⣾⠃⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⣷⣄⠀⠀⠀⠀⠀⠀⠈⠻⢿⣿⢟⡁⠀⠀⠀⢀⡼⢅⣾⡃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⠁⠙⢶⣀⠀⠀⠀⠀⠘⢷⣼⣧⠾⠃⠀⢀⣠⣾⣶⢟⠙⣷⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣸⠃⠀⠀⠀⠙⠳⣤⣀⡀⠀⠀⠀⠀⠀⢀⣴⣫⡾⠛⠁⠈⢇⠘⣧⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣰⡟⠀⠄⠀⠀⠀⠀⠀⠈⠙⠛⠓⠒⠚⠛⠛⠉⠀⠀⠀⠀⠀⠘⡄⣻⣆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣰⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⢸⡿⣆⠀⠀⠀⠀
⠀⠀⠀⢠⡟⢸⡇⠀⠀⠀⠀⠀⠀⠀⢀⣄⠀⠀⠀⠀⠀⢠⡀⠀⠀⠀⠀⠀⠀⣿⢸⡇⢻⡆⠀⠀⠀
⠀⣠⣾⣿⡟⡿⣷⠀⠀⠀⠀⠀⠀⠀⢺⡇⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⣟⣾⡟⡛⠳⢶⣄⠀
⣴⠟⢈⢿⣦⣼⡿⣆⠀⠀⠀⠀⠀⠀⠈⢿⡦⠀⠀⠀⠀⡿⠁⠀⠀⠀⠀⠀⣸⣿⣿⡿⢹⣦⡀⠹⣧
⣿⡆⢿⡖⢂⣀⣴⣿⣆⠀⠀⠀⠀⠀⠀⠘⣿⠀⠀⠀⣾⠃⠀⠀⠀⠀⠀⢠⣿⣿⣯⣅⠀⠱⣷⢀⣿
⠈⢷⣄⠑⢿⣿⣿⠁⣽⣧⡀⠀⢠⠀⣶⡀⣿⡿⠀⠀⣿⠀⣴⠀⢀⠀⢠⣿⣯⡈⢿⣿⣿⠆⢠⣾⠃
⠀⠀⠙⠷⢦⣤⡶⠿⠃⠈⠛⢶⣼⣧⣸⣿⠟⠻⠶⠒⠻⣾⣏⣴⣿⡶⠟⠁⠘⠻⢦⣤⣴⠾⠋⠁</pre>`;
        envOutput.classList.add('visible'); envInput.value = '';
      }
    });
  }

  // 9. Contact Form Validation
  const form = $('#contact-form');
  if(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      const fields = form.querySelectorAll('input, textarea');
      fields.forEach(f => {
        const err = f.parentElement.querySelector('.error');
        err.textContent = '';
        if (f.id === 'email') {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if(!re.test(f.value)) { err.textContent = '✗ Invalid format'; valid = false; }
        } else if(!f.checkValidity()) { err.textContent = `✗ Required${f.minLength ? ` (min ${f.minLength})` : ''}`; valid = false; }
      });
      if(valid) {
        const btn = form.querySelector('.submit-btn'); btn.textContent = '✓ Queued'; btn.disabled = true; form.reset();
        console.log('✓ Contact form validated. Ready for mailto fallback or API integration.');
      }
    });
  }
});