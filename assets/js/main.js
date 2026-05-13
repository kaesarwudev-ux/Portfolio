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

  // 3. Language settings and command palette
  const translations = {
    en: {
      settingsTitle: 'Settings',
      settingsDescription: 'Choose your preferred display language.',
      languageLabel: 'Language',
      languageEnglish: 'English',
      languageChinese: '中文',
      closeButton: 'Close',
      paletteHeader: 'Route to page or section...',
      heroSub: 'Student @ Macleans College • Eastern Times Junior Journalist • Web Developer • Professionally Unemployed',
      heroStatus: '[✓] Available for collaborations',
      pinnedDirectories: 'Pinned Directories',
      currentFocus: 'Current Focus',
      focus1: '→ Frontend Architecture & Performance',
      focus2: '→ Technical Writing & Journalism',
      focus3: '→ Accessible UI Systems',
      focus4: '→ Local Dev Environments',
      footerText: 'Built with vanilla HTML/CSS/JS • Zero dependencies',
      aboutTitle: 'Profile',
      aboutBio: 'Student at Macleans College (Auckland, NZ) with a focus on systems-level frontend architecture and accessible interfaces. Previously built foundational technical literacy at Bucklands Beach Intermediate. Currently contributing technical reporting as a Junior Journalist for Eastern Times, bridging local storytelling with structured data analysis.',
      stackTitle: 'Tech Stack',
      beyondTitle: 'Beyond Code',
      beyondText: 'Outside of tech, I am an avid table tennis player, wielding a Butterfly Timo Boll CAF with Hurricane III Forehand and Vega Asia Backhand rubbers. I also have a deep fascination with physics, particularly quantum mechanics, which fuels my curiosity about the fundamental nature of reality.',
      comingSoonTitle: 'Coming Soon',
      comingSoonDesc: '🚧 Projects are currently under construction. Check back soon for an updated portfolio! 🚧',
      comingSoonRemind: 'In the meantime, feel free to explore my other pages or reach out via the contact form.',
      contactTitle: 'Contact',
      contactStatus: 'Usually reply within 48 hours',
      contactEmailLabel: 'email:',
      contactGithubLabel: 'github:',
      contactDiscordLabel: 'discord username:',
      contactInstagramLabel: 'instagram:'
    },
    zh: {
      settingsTitle: '設定',
      settingsDescription: '選擇您偏好的顯示語言。',
      languageLabel: '語言',
      languageEnglish: 'English',
      languageChinese: '中文',
      closeButton: '關閉',
      paletteHeader: '導覽至頁面或區段...',
      heroSub: 'Macleans 學院學生 • Eastern Times 初級記者 • 網頁開發者 • 專業失業中',
      heroStatus: '[✓] 可接受合作',
      pinnedDirectories: '已釘選目錄',
      currentFocus: '當前專注',
      focus1: '→ 前端架構與效能',
      focus2: '→ 技術寫作與新聞報導',
      focus3: '→ 無障礙使用者介面系統',
      focus4: '→ 本地開發環境',
      footerText: '使用純 HTML/CSS/JS 建置 • 無任何相依',
      aboutTitle: '個人簡介',
      aboutBio: 'Macleans 學院（奧克蘭，新西蘭）學生，專注於系統層級前端架構與可及性介面。曾在 Bucklands Beach Intermediate 建立技術素養，目前為 Eastern Times 擔任初級記者，將在地故事與結構化數據分析結合。',
      stackTitle: '技術堆疊',
      beyondTitle: '程式之外',
      beyondText: '程式之外，我是認真的桌球迷，使用 Butterfly Timo Boll CAF 內弧與 Vega Asia 反手膠皮。我也深深著迷於物理，尤其是量子力學，這激發我對現實基本本質的好奇。',
      comingSoonTitle: '敬請期待',
      comingSoonDesc: '🚧 專案目前正在建置中。請稍後回來查看更新的作品集！🚧',
      comingSoonRemind: '同時，歡迎瀏覽其他頁面或透過聯絡表單與我聯繫。',
      contactTitle: '聯絡方式',
      contactStatus: '通常會在 48 小時內回覆',
      contactEmailLabel: '電子郵件：',
      contactGithubLabel: 'Github：',
      contactDiscordLabel: 'Discord 使用者：',
      contactInstagramLabel: 'Instagram：'
    }
  };

  const settingsDialog = $('#settings-dialog');
  const settingsTrigger = $('#settings-trigger');
  const settingsClose = $('#settings-close');
  const languageSelect = $('#language-select');
  const palette = $('#command-palette');
  const paletteBtn = $('#palette-trigger');
  const results = $('#palette-results');
  let paletteInput = $('#palette-input');
  const routes = [
    { name: 'Home', path: 'index.html', anchor: '#hero-heading' },
    { name: 'About', path: 'about.html', anchor: '#bio-heading' },
    { name: 'Projects', path: 'projects.html', anchor: '#archive-heading' },
    { name: 'Gallery', path: 'gallery.html', anchor: '#gallery-heading' },
    { name: 'Contact', path: 'contact.html', anchor: '#contact-heading' },
    { name: 'Settings', action: 'settings' }
  ];

  const translatePage = (lang) => {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang]?.[key]) el.textContent = translations[lang][key];
    });
    if (languageSelect) languageSelect.value = lang;
  };

  const currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
  translatePage(currentLanguage);

  const buildPaletteInput = () => {
    if (!palette || paletteInput) return;
    const header = palette.querySelector('.palette-header');
    if (!header) return;
    paletteInput = document.createElement('input');
    paletteInput.id = 'palette-input';
    paletteInput.className = 'palette-input';
    paletteInput.type = 'text';
    paletteInput.autocomplete = 'off';
    paletteInput.placeholder = 'Type a page name...';
    paletteInput.setAttribute('aria-label', 'Search pages');
    paletteInput.addEventListener('input', () => renderPaletteItems(paletteInput.value));
    paletteInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const first = results.querySelector('.palette-item:not([hidden])');
        if (first) first.click();
      }
      if (e.key === 'ArrowDown') {
        results.querySelector('.palette-item:not([hidden])')?.focus();
        e.preventDefault();
      }
    });
    header.appendChild(paletteInput);
  };

  const renderPaletteItems = (filter = '') => {
    if (!results) return;
    const normalized = filter.trim().toLowerCase();
    results.innerHTML = '';
    const matches = routes.filter(route => {
      const label = route.name.toLowerCase();
      const path = route.path ? route.path.toLowerCase() : '';
      return normalized === '' || label.includes(normalized) || path.includes(normalized);
    });

    if (!matches.length) {
      results.innerHTML = '<li class="palette-empty">No matching pages found.</li>';
      return;
    }

    matches.forEach(route => {
      if (route.action) {
        results.innerHTML += `<li class="palette-item" tabindex="0" data-action="${route.action}">${route.name}</li>`;
      } else {
        results.innerHTML += `<li class="palette-item" tabindex="0" data-path="${route.path}">${route.name} <span class="path">${route.path}</span></li>`;
      }
    });
  };

  const openSettings = () => {
    closePalette();
    settingsDialog?.showModal();
  };
  const closeSettings = () => settingsDialog?.close();
  const openPalette = () => {
    if (palette) {
      buildPaletteInput();
      renderPaletteItems('');
      palette.showModal();
      paletteInput?.focus();
    }
  };
  const closePalette = () => { if (palette) palette.close(); };
  if (settingsTrigger) settingsTrigger.addEventListener('click', openSettings);
  if (settingsClose) settingsClose.addEventListener('click', closeSettings);
  if (languageSelect) languageSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    localStorage.setItem('preferredLanguage', lang);
    translatePage(lang);
  });
  if (paletteBtn) paletteBtn.addEventListener('click', openPalette);
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); palette?.open ? closePalette() : openPalette(); }
    if (e.key === 'Escape') {
      closePalette();
      closeSettings();
    }
  });
  if(results) {
    results.addEventListener('click', e => {
      const item = e.target.closest('.palette-item');
      if (!item) return;
      if (item.dataset.action === 'settings') openSettings();
      else if (item.dataset.path) window.location.href = item.dataset.path;
    });
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

  // 10. Gallery Lightbox
  const lightbox = $('#gallery-lightbox');
  const lightboxBackdrop = $('.lightbox-backdrop');
  const lightboxImage = $('#lightbox-image');
  const lightboxCaption = $('#lightbox-caption');
  const lightboxClose = $('.lightbox-close');
  const lightboxPrev = $('.lightbox-prev');
  const lightboxNext = $('.lightbox-next');
  let currentIndex = 0;
  let galleryItems = [];

  if (lightbox) {
    const galleryCards = $$('.gallery-card');
    galleryItems = Array.from(galleryCards).map(card => ({
      img: card.querySelector('img').src,
      alt: card.querySelector('img').alt,
      title: card.querySelector('.gallery-card-title').textContent,
      caption: card.querySelector('.gallery-card-caption').textContent
    }));

    galleryCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        currentIndex = index;
        showLightbox();
      });
    });

    const showLightbox = () => {
      const item = galleryItems[currentIndex];
      lightboxImage.src = item.img;
      lightboxImage.alt = item.alt;
      lightboxCaption.textContent = `${item.title}: ${item.caption}`;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    const prevImage = () => {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightboxImage();
    };

    const nextImage = () => {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateLightboxImage();
    };

    const updateLightboxImage = () => {
      const item = galleryItems[currentIndex];
      lightboxImage.style.transform = 'scale(0.9)';
      setTimeout(() => {
        lightboxImage.src = item.img;
        lightboxImage.alt = item.alt;
        lightboxCaption.textContent = `${item.title}: ${item.caption}`;
        lightboxImage.style.transform = 'scale(1)';
      }, 150);
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxBackdrop?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', prevImage);
    lightboxNext?.addEventListener('click', nextImage);

    document.addEventListener('keydown', e => {
      if (lightbox.classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') prevImage();
        else if (e.key === 'ArrowRight') nextImage();
      }
    });
  }
});