(function () {
  'use strict';

  var IDENTITY = {
    name: 'Kaesar Wu',
    github: 'kaesarwudev-ux',
    email: 'kaesarwudev@gmail.com',
    ide: 'Visual Studio Code',
    instagram: 'kaesarwudev',
    os: 'Windows 11',
    school: 'Macleans College',
    previousSchool: 'Bucklands Beach Intermediate School',
    role: 'Eastern Times Junior Journalist (NZ)',
    awards: ['2025 ANZAC Essay Competition Winner'],
    interests: [
      'Physics (Particularly Theoretical Physics)',
      'Formula 1',
      'Cars',
      'Table Tennis',
    ],
    portfolioUrl: 'https://kwdev.vercel.app',
    verstappenStatus: 'DIE-HARD FAN  #MaxVerstappen #OrangeArmy',
    available: true,
  };

  var VERSTAPPEN_QUOTES = [
    "'SIMPLY LOVELY'",
    'I am the best driver because I believe that I am the best, because every driver needs to think like that, otherwise it is better to stay at home.',
    'The only place that matters is first.',
    "'You can sleep when you're dead'",
    "'Stress is very bad for you, and you're gonna die sooner if you have a lot of stress, so I'm gonna be 250 years old.'",
  ]
  var SKILLS = {
    Languages: ['Python', 'JavaScript', 'C++', 'HTML/CSS', 'SQL'],
    Frameworks: ['React', 'Node.js', 'Flask', 'Tailwind CSS'],
    Tools: [IDENTITY.ide, 'Git', 'Docker', 'Ollama', 'VS Code'],
    Concepts: ['Frontend Architecture', 'API Design', 'Technical Writing', 'Physics Modeling'],
  };

  var PROJECTS = [
    { name: 'Primatetype-Project', lang: 'C++', desc: 'Collaborative project with Wilsonwei123, BBI-dev', url: 'https://github.com/KaesarWU/Primatetype-Project' },
    { name: 'SocraTask', lang: 'JavaScript', desc: 'Task management web application', url: 'https://github.com/KaesarWU/SocraTask' },
    { name: 'Terminal Portfolio', lang: 'Python', desc: 'CLI portfolio built for Windows 11', url: null },
    { name: 'Cool-Math-Games', lang: 'JavaScript', desc: 'Simple educational math games side project', url: 'https://github.com/KaesarWU/Cool-Math-Games' },
  ];

  var JOURNALISM = [
    { title: 'A tricky Card Game - Bridge', pub: 'Macleans News', date: '2026-04-19', url: 'https://macleansnews.nz/2026/04/19/a-tricky-card-game-bridge/' },
    { title: '2026 South-East Auckland Shakespeare Festival', pub: 'Macleans News', date: '2026-05-07', url: 'https://macleansnews.nz/2026/05/07/2026-south-east-auckland-shakespeare-festival/' },
    { title: 'Community patrollers help to keep us safe', pub: 'Eastern Times', date: '2025-10-05', url: 'https://www.times.co.nz/news/community-patrollers-help-to-keep-us-safe/' },
    { title: 'Pupil to deliver speech on Anzac spirit', pub: 'Eastern Times', date: '2025-04-23', note: 'ANZAC Essay Competition Winner', url: 'https://www.times.co.nz/junior-journalists/pupil-to-deliver-speech-on-anzac-spirit/' },
  ];

  var BANNER = [
    '  ██╗  ██╗   ██╗    ██╗   ██████╗   ███████╗  ██╗   ██╗',
    '  ██║ ██╔╝   ██║    ██║   ██╔══██╗  ██╔════╝  ██║   ██║',
    '  █████╔╝    ██║ █╗ ██║   ██║  ██║  █████╗    ██║   ██║',
    '  ██╔═██╗    ██║███╗██║   ██║  ██║  ██╔══╝    ╚██╗ ██╔╝',
    '  ██║  ██╗   ╚███╔███╔╝   ██████╔╝  ███████╗   ╚████╔╝',
    '  ╚═╝  ╚═╝    ╚══╝╚══╝    ╚═════╝   ╚══════╝    ╚═══╝',
  ];

  var COMMANDS = {
    help: 'Show available commands',
    about: 'About Kaesar Wu',
    skills: 'Technical skills & tools',
    projects: 'Featured projects',
    journalism: 'Eastern Times & Macleans News articles',
    awards: 'Achievements & competitions',
    interests: 'Personal interests & hobbies',
    max: 'MAX VERSTAPPEN MODE ACTIVATED',
    contact: 'Contact information',
    social: 'Social media links',
    github: 'GitHub repositories',
    clear: 'Clear terminal screen',
    exit: 'Exit terminal',
    whoami: 'Display current identity',
    neofetch: 'System & identity summary',
    kwdev: 'Open kwdev.vercel.app',
    f1: 'F1 standings & Max updates',
  };

  var terminalOverlay, outputEl, inputEl, resizeHandle;
  var history = [];
  var historyIndex = -1;
  var isOpen = false;
  var terminalHeight = null;

  /* ── Global keyboard shortcut (registered immediately, not inside init) ── */
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.code === 'Backquote' || e.code === 'IntlBackslash' || e.key === '\u0060')) {
      e.preventDefault();
      if (!terminalOverlay) return;
      toggle();
    }
    if (e.key === 'Escape' && isOpen) {
      close();
    }
  });

  function init() {
    terminalOverlay = document.getElementById('terminal-overlay');
    if (!terminalOverlay) return;
    outputEl = terminalOverlay.querySelector('.terminal-output');
    inputEl = terminalOverlay.querySelector('.terminal-input-line input');
    if (!outputEl || !inputEl) return;

    inputEl.addEventListener('keydown', onInputKeydown);

    var closeBtn = document.getElementById('terminal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', close);

    resizeHandle = document.getElementById('terminal-resize-handle');
    if (resizeHandle) {
      resizeHandle.addEventListener('mousedown', onResizeStart);
      resizeHandle.addEventListener('touchstart', onResizeStart, { passive: false });
    }

    renderWelcome();
  }

  function toggle() {
    if (isOpen) close();
    else open();
  }

  function open() {
    isOpen = true;
    terminalOverlay.classList.add('open');
    inputEl.focus();
    historyIndex = history.length;
  }

  function close() {
    isOpen = false;
    terminalOverlay.classList.remove('open');
    document.activeElement && document.activeElement.blur();
  }

  /* ── Resize drag handlers ── */
  function onResizeStart(e) {
    e.preventDefault();
    var startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    var startHeight = terminalOverlay.offsetHeight;

    resizeHandle && resizeHandle.classList.add('active');

    function onMove(ev) {
      ev.preventDefault();
      var currentY = ev.type === 'touchmove' ? ev.touches[0].clientY : ev.clientY;
      var deltaY = startY - currentY;
      var newHeight = Math.min(Math.max(startHeight + deltaY, 150), window.innerHeight * 0.9);
      terminalOverlay.style.height = newHeight + 'px';
      terminalHeight = newHeight;
    }

    function onEnd() {
      resizeHandle && resizeHandle.classList.remove('active');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  }

  function writeln(html, cls) {
    var line = document.createElement('div');
    line.className = 'terminal-line';
    if (cls) line.classList.add(cls);
    line.innerHTML = html;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function writeSection(title) {
    writeln('┌' + '─'.repeat(64) + '┐', 'term-magenta');
    writeln('│  ' + title + ' '.repeat(Math.max(0, 62 - title.length)) + '│', 'term-magenta');
    writeln('└' + '─'.repeat(64) + '┘', 'term-magenta');
  }

  function writeItem(label, value) {
    writeln('  ' + label + ': ' + value, 'term-white');
  }

  function typewriter(text, cls, delay) {
    delay = delay || 12;
    var line = document.createElement('div');
    line.className = 'terminal-line';
    if (cls) line.classList.add(cls);
    outputEl.appendChild(line);
    var i = 0;
    function tick() {
      if (i < text.length) {
        line.textContent += text[i];
        i++;
        outputEl.scrollTop = outputEl.scrollHeight;
        setTimeout(tick, delay);
      }
    }
    tick();
  }

  function cmdHelp() {
    writeSection('Available Commands');
    var sorted = Object.keys(COMMANDS).sort();
    var maxLen = sorted.reduce(function (a, c) { return Math.max(a, c.length); }, 0);
    sorted.forEach(function (cmd) {
      var pad = ' '.repeat(maxLen - cmd.length);
      var emoji = cmd === 'max' ? ' ' : ' ';
      writeln('  <span class="term-yellow">' + cmd + '</span>' + pad + '  ' + emoji + '  ' + COMMANDS[cmd], 'term-dim');
    });
    writeln('');
    writeln('Pro tip: Type max for Verstappen mode', 'term-dim');
  }

  function cmdAbout() {
    writeSection('About ' + IDENTITY.name);
    writeln('  Student @ ' + IDENTITY.school, 'term-white');
    writeln('  ' + IDENTITY.role, 'term-white');
    writeln('  Primary IDE: ' + IDENTITY.ide, 'term-white');
    writeln('  OS: ' + IDENTITY.os, 'term-white');
    writeln('');
    writeln(' Verstappen Status: ' + IDENTITY.verstappenStatus, 'term-orange');
    writeln('');
    writeln('"Professionally Unemployed. Available for collaborations."', 'term-dim');
    writeln('');
    writeln('Portfolio: ' + IDENTITY.portfolioUrl, 'term-cyan');
    writeln('Status: ' + (IDENTITY.available ? ' Available' : ' Busy'), 'term-green');
  }

  function cmdSkills() {
    writeSection('Technical Skills');
    Object.keys(SKILLS).forEach(function (cat) {
      writeln('  ' + cat + ':', 'term-yellow');
      SKILLS[cat].forEach(function (item) {
        writeln('    ' + item, 'term-green');
      });
      writeln('');
    });
  }

  function cmdProjects() {
    writeSection('Featured Projects');
    PROJECTS.forEach(function (proj, i) {
      writeln('  [' + (i + 1) + '] ' + proj.name, 'term-cyan');
      writeln('      Language: ' + proj.lang, 'term-dim');
      writeln('      Desc: ' + proj.desc, 'term-dim');
      if (proj.url) {
        writeln('      ' + proj.url, 'term-blue');
      }
      writeln('');
    });
  }

  function cmdJournalism() {
    writeSection('Journalism Portfolio');
    JOURNALISM.forEach(function (a) {
      writeln('  ' + a.title, 'term-yellow');
      writeln('      Publication: ' + a.pub, 'term-dim');
      writeln('      Date: ' + a.date, 'term-dim');
      if (a.note) writeln('      ' + a.note, 'term-green');
      writeln('      ' + a.url, 'term-blue');
      writeln('');
    });
  }

  function cmdAwards() {
    writeSection('Awards & Achievements');
    IDENTITY.awards.forEach(function (award) {
      writeln('  ' + award, 'term-gold');
    });
    writeln('');
    writeln('  Additional:', 'term-dim');
    writeln('    Anzac Day Dawn Service Speaker (Howick, 2025)');
    writeln('    Published Journalist: Macleans News, Eastern Times');
    writeln('    Mathematics Competition Medalist');
  }

  function cmdInterests() {
    writeSection('Interests & Hobbies');
    IDENTITY.interests.forEach(function (interest) {
      writeln('  ' + interest);
    });
    writeln('');
    writeln(' MAX VERSTAPPEN: ' + IDENTITY.verstappenStatus, 'term-orange');
    writeln(' Orange Army for life | #33 Forever', 'term-orange');
    writeln(' Aspiring Theoretical Physicist', 'term-yellow');
  }

  function cmdMax() {
    writeSection(' MAX VERSTAPPEN DIE-HARD MODE ACTIVATED ');
    writeln('╔' + '═'.repeat(60) + '╗', 'term-orange');
    writeln('║  MAX EMILIAN VERSTAPPEN' + ' '.repeat(34) + '║', 'term-orange');
    writeln('║  #33  Red Bull Racing  Dutch Lion' + ' '.repeat(27) + '║', 'term-orange');
    writeln('╚' + '═'.repeat(60) + '╝', 'term-orange');
    writeln('');
    writeln(' Championships: 2021  2022  2023  2024', 'term-gold');
    writeln(' Career Wins: 60+ (and counting...)', 'term-gold');
    writeln(' Pole Positions: 40+', 'term-gold');
    writeln('');
    writeln('Max Verstappen Quotes:', 'term-orange');
    var shuffled = VERSTAPPEN_QUOTES.slice().sort(function () { return 0.5 - Math.random(); });
    shuffled.slice(0, 3).forEach(function (q) {
      writeln('    ' + q, 'term-white');
    });
    writeln('');
    writeln(' Orange Army Stand Up! ', 'term-orange');
    writeln("Type 'f1' for current season updates", 'term-dim');
  }

  function cmdF1() {
    writeSection(' Formula 1  Max Verstappen Updates');
    writeln('Current Champion: Max Verstappen', 'term-orange');
    writeln('Team: Oracle Red Bull Racing', 'term-orange');
    writeln('Car: RB21', 'term-orange');
    writeln('');
    writeln(' Next Race: Check formula1.com', 'term-dim');
    writeln(' Live Standings: espn.com/f1', 'term-dim');
    writeln('');
    writeln(" Kaesar's Prediction: Max takes #5", 'term-orange');
  }

  function cmdContact() {
    writeSection('Contact Information');
    writeItem('Email', IDENTITY.email);
    writeItem('GitHub', 'github.com/' + IDENTITY.github);
    writeItem('Instagram', '@' + IDENTITY.instagram);
    writeItem('Portfolio', IDENTITY.portfolioUrl);
    writeln('');
    writeln('  Open to collaborations, journalism projects, & tech discussions', 'term-dim');
    writeln('  Also happy to chat F1, Max, & Orange Army stuff!', 'term-orange');
  }

  function cmdSocial() {
    writeSection('Social Media');
    writeln(' Instagram: https://instagram.com/' + IDENTITY.instagram, 'term-pink');
    writeln(' GitHub: https://github.com/' + IDENTITY.github, 'term-blue');
    writeln(' Portfolio: ' + IDENTITY.portfolioUrl, 'term-cyan');
    writeln(' Eastern Times: https://www.times.co.nz/tag/kaesar-wu/', 'term-dim');
    writeln(' F1: https://www.formula1.com/en/drivers/max-verstappen.html', 'term-orange');
  }

  function cmdGithub() {
    writeSection('GitHub: @' + IDENTITY.github);
    writeln('Repositories: 17+ (Public)', 'term-dim');
    writeln('Languages: Python, C++, JavaScript', 'term-dim');
    writeln('Focus: Learning systems programming & web dev', 'term-dim');
    writeln('');
    writeln('Popular Repos:', 'term-yellow');
    writeln('  Primatetype-Project (C++)');
    writeln('  SocraTask (JavaScript)');
    writeln('  Cool-Math-Games (Educational)');
    writeln('');
    writeln(' https://github.com/' + IDENTITY.github, 'term-blue');
  }

  function cmdClear() {
    outputEl.innerHTML = '';
    renderBanner();
    cmdNeofetch();
  }

  function cmdExit() {
    writeln('╭' + '─'.repeat(60) + '╮', 'term-orange');
    writeln('│  Thanks for visiting KWDEV! Max would be proud. ' + ' '.repeat(13) + '│', 'term-orange');
    writeln('│  Press Ctrl+` to open terminal again anytime        │', 'term-orange');
    writeln('╰' + '─'.repeat(60) + '╯', 'term-orange');
    writeln('');
    setTimeout(close, 1200);
  }

  function cmdWhoami() {
    writeln(' ' + IDENTITY.name, 'term-yellow');
    writeln(' ' + IDENTITY.role, 'term-yellow');
    writeln(' ' + IDENTITY.school + '  ' + IDENTITY.os, 'term-yellow');
    writeln(' ' + IDENTITY.verstappenStatus, 'term-orange');
  }

  function cmdNeofetch() {
    writeln('        ╔════════════════════════════════╗', 'term-cyan');
    writeln('        ║  Kaesar Wu' + ' '.repeat(27) + '║', 'term-cyan');
    writeln('        ╚════════════════════════════════╝', 'term-cyan');
    writeln('');
    writeln('OS:        ' + IDENTITY.os, 'term-yellow');
    writeln('Shell:     KWDEV Web Terminal');
    writeln('IDE:       ' + IDENTITY.ide, 'term-yellow');
    writeln('School:    ' + IDENTITY.school, 'term-yellow');
    writeln('Role:      ' + IDENTITY.role, 'term-yellow');
    writeln('Max Fan:   ' + IDENTITY.verstappenStatus, 'term-orange');
    writeln('Status:    ' + (IDENTITY.available ? ' Available' : ' Busy'), 'term-green');
    writeln('');
    writeln('Quick Links:', 'term-yellow');
    writeln('            kwdev.vercel.app');
    writeln('            github.com/' + IDENTITY.github);
    writeln('');
  }

  function cmdKwdev() {
    writeln('Opening ' + IDENTITY.portfolioUrl + ' in new tab...', 'term-cyan');
    window.open(IDENTITY.portfolioUrl, '_blank');
  }

  function renderBanner() {
    BANNER.forEach(function (line) {
      writeln(line, 'term-cyan');
    });
    writeln('  DIE-HARD MAX VERSTAPPEN FAN ', 'term-orange');
    writeln('  Kaesar Wu  kwdev.vercel.app  Windows 11', 'term-dim');
    writeln('');
  }

  function renderWelcome() {
    renderBanner();
    var welcome = ' Welcome to KWDEV  ' + IDENTITY.name + "'s Terminal Portfolio";
    typewriter(welcome, 'term-green', 10);
    setTimeout(function () {
      writeln(' DIE-HARD MAX VERSTAPPEN FAN MODE: ON', 'term-orange');
      writeln(" Type 'help' or 'max' to get started", 'term-dim');
      writeln('');
    }, welcome.length * 10 + 100);
  }

  function onInputKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var text = inputEl.value.trim();
      inputEl.value = '';

      writeln('<span class="term-cyan">kwdev</span><span class="term-white">@</span><span class="term-orange">verstappen</span><span class="term-white">:~$</span> ' + text);

      if (text) {
        history.push(text);
        historyIndex = history.length;
        parseCommand(text);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        inputEl.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        inputEl.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        inputEl.value = '';
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      cmdClear();
    }
  }

  function parseCommand(input) {
    var parts = input.split(/\s+/);
    var cmd = parts[0].toLowerCase();

    switch (cmd) {
      case 'help': cmdHelp(); break;
      case 'about': cmdAbout(); break;
      case 'skills': cmdSkills(); break;
      case 'projects': cmdProjects(); break;
      case 'journalism': cmdJournalism(); break;
      case 'awards': cmdAwards(); break;
      case 'interests': cmdInterests(); break;
      case 'max': cmdMax(); break;
      case 'contact': cmdContact(); break;
      case 'social': cmdSocial(); break;
      case 'github': cmdGithub(); break;
      case 'clear': cmdClear(); break;
      case 'exit':
      case 'quit':
      case 'q':
        cmdExit(); break;
      case 'whoami': cmdWhoami(); break;
      case 'neofetch': cmdNeofetch(); break;
      case 'kwdev': cmdKwdev(); break;
      case 'f1': cmdF1(); break;
      default:
        writeln("Unknown command: '" + cmd + "'", 'term-red');
        writeln("Type 'help' for available commands", 'term-dim');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
