(function () {
  'use strict';

  var IDENTITY = {
    name: 'Kaesar Wu',
    github: 'kaesarwudev-ux',
    email: 'kaesarwudev@gmail.com',
    role: 'Developer & Writer',
    portfolioUrl: 'https://kwdev.vercel.app',
    available: true,
  };
  var SKILLS = {
    Languages: ['Python', 'JavaScript', 'C++', 'HTML/CSS', 'SQL'],
    Frameworks: ['React', 'Node.js', 'Flask', 'Tailwind CSS'],
    Tools: ['Git', 'Docker', 'Ollama', 'VS Code'],
    Concepts: ['Frontend Architecture', 'API Design', 'Technical Writing', 'Physics Modeling'],
  };

  var PROJECTS = [
    { name: 'Primatetype-Project', lang: 'C++ and HTML/CSS', desc: 'Collaborative project with Wilsonwei123, BBI-dev', url: 'https://github.com/KaesarWU/Primatetype-Project' },
    { name: 'Terminal Portfolio', lang: 'Python', desc: 'CLI portfolio built for Windows 11', url: null },
  ];

  var COMMANDS = {
    help: 'Show available commands',
    about: 'About Kaesar Wu',
    skills: 'Technical skills & tools',
    projects: 'Featured projects',
    contact: 'Contact information',
    github: 'GitHub repositories',
    clear: 'Clear terminal screen',
    exit: 'Exit terminal'
  };

  var BANNER = [
    '  ██╗  ██╗   ██╗    ██╗   ██████╗   ███████╗  ██╗   ██╗',
    '  ██║ ██╔╝   ██║    ██║   ██╔══██╗  ██╔════╝  ██║   ██║',
    '  █████╔╝    ██║ █╗ ██║   ██║  ██║  █████╗    ██║   ██║',
    '  ██╔═██╗    ██║███╗██║   ██║  ██║  ██╔══╝    ╚██╗ ██╔╝',
    '  ██║  ██╗   ╚███╔███╔╝   ██████╔╝  ███████╗   ╚████╔╝',
    '  ╚═╝  ╚═╝    ╚══╝╚══╝    ╚═════╝   ╚══════╝    ╚═══╝',
  ];

  var terminalOverlay, outputEl, inputEl, resizeHandle;
  var history = [];
  var historyIndex = -1;
  var isOpen = false;
  var terminalHeight = null;

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.code === 'Backquote' || e.code === 'IntlBackslash' || e.key === '\u0060')) {
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
    line.innerHTML = makeLinksClickable(html);
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function makeLinksClickable(text) {
    return text.replace(/(https?:\/\/[^\s<>"']+)/g, '<a href="$1" target="_blank" style="color: inherit; text-decoration: underline; cursor: pointer;">$1</a>');
  }

  function writeSection(title) {
    writeln('> ' + title, 'term-cyan');
  }

  function writeItem(label, value) {
    writeln('  ' + label + ': ' + value);
  }

  function cmdHelp() {
    writeSection('Available Commands');
    var sorted = Object.keys(COMMANDS).sort();
    var maxLen = sorted.reduce(function (a, c) { return Math.max(a, c.length); }, 0);
    sorted.forEach(function (cmd) {
      var pad = ' '.repeat(maxLen - cmd.length);
      writeln('  <span class="term-yellow">' + cmd + '</span>' + pad + '  ' + COMMANDS[cmd], 'term-dim');
    });
    writeln('');
  }

  function cmdAbout() {
    writeSection('About');
    writeItem('Name', IDENTITY.name);
    writeItem('Role', IDENTITY.role);
    writeItem('Email', IDENTITY.email);
    writeItem('Portfolio', IDENTITY.portfolioUrl);
    writeItem('Status', IDENTITY.available ? 'Available' : 'Busy');
    writeln('');
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

  function cmdContact() {
    writeSection('Contact');
    writeItem('Email', IDENTITY.email);
    writeItem('GitHub', 'github.com/' + IDENTITY.github);
    writeItem('Portfolio', IDENTITY.portfolioUrl);
    writeln('');
  }

  function cmdGithub() {
    writeSection('GitHub: @' + IDENTITY.github);
    writeln('Repositories: 17+ (Public)', 'term-dim');
    writeln('Languages: Python, C++, JavaScript', 'term-dim');
    writeln('Focus: Learning systems programming & web dev', 'term-dim');
    writeln('');
    writeln('Popular Repos:', 'term-yellow');
    writeln('  Primatetype-Project (C++)');
    writeln('');
    writeln(' https://github.com/' + IDENTITY.github, 'term-blue');
  }

  function cmdClear() {
    outputEl.innerHTML = '';
    renderWelcome();
  }

  function cmdExit() {
    writeln('Thanks for visiting.');
    setTimeout(close, 800);
  }

  function renderBanner() {
    BANNER.forEach(function (line) {
      writeln(line, 'term-cyan');
    });
    writeln('  Developer & Writer • kwdev.vercel.app', 'term-dim');
    writeln('');
  }

  function renderWelcome() {
    renderBanner();
    writeln('Welcome to ' + IDENTITY.name + '\'s Terminal', 'term-cyan');
    writeln('Type "help" for available commands', 'term-dim');
    writeln('');
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
      case 'contact': cmdContact(); break;
      case 'github': cmdGithub(); break;
      case 'clear': cmdClear(); break;
      case 'exit':
      case 'quit':
      case 'q':
        cmdExit(); break;
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
