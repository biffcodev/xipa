/* Xipa — home page interactions (vanilla, no framework).
   Ported from the original Claude Design component: hero slider, the 4-pillar
   pinned parallax, the pinned horizontal projects rail, the methodology
   scrollytelling, the animated stats band, the linear/circular data toggle,
   the expanding team grid and the newsletter form. Theme, language and nav
   collapse are handled by chrome.js; the mobile drawer by menu.js. */
(function () {
  if (window.__xipaHome) return; window.__xipaHome = true;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  // ─────────────────────────── HERO SLIDER ───────────────────────────
  var heroTimer = null, heroPause = null, heroResume = null;
  function setupHero() {
    var root = document.getElementById('top');
    if (!root) return;
    var slides = Array.prototype.slice.call(root.querySelectorAll('.hero-slide'));
    var bullets = Array.prototype.slice.call(root.querySelectorAll('.hero-bullet'));
    var imgs = Array.prototype.slice.call(root.querySelectorAll('.hero-img'));
    if (!slides.length) return;
    var DUR = 5500, cur = 0;
    function show(n) {
      cur = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.style.opacity = (i === cur) ? '1' : '0';
        if (imgs[i]) {
          imgs[i].style.transform = (i === cur) ? 'scale(1.06)' : 'scale(1)';
          imgs[i].style.transition = (i === cur) ? 'transform ' + (DUR + 1100) + 'ms ease-out' : 'transform .6s ease';
        }
      });
      bullets.forEach(function (b, i) {
        var fill = b.querySelector('.hero-fill');
        b.style.width = (i === cur) ? '88px' : '64px';
        b.style.transition = 'width .5s ease';
        if (!fill) return;
        if (i === cur) {
          fill.style.transition = 'none'; fill.style.width = '0%';
          void fill.offsetWidth;
          fill.style.transition = 'width ' + DUR + 'ms linear'; fill.style.width = '100%';
        } else { fill.style.transition = 'none'; fill.style.width = '0%'; }
      });
    }
    function next() { show(cur + 1); }
    function prev() { show(cur - 1); }
    function restart() { if (heroTimer) clearInterval(heroTimer); heroTimer = setInterval(next, DUR); }
    function go(n) { show(n); restart(); }
    bullets.forEach(function (b) { b.addEventListener('click', function () { go(parseInt(b.getAttribute('data-h'), 10)); }); });
    var pv = document.getElementById('hero-prev'), nx = document.getElementById('hero-next');
    if (pv) pv.addEventListener('click', function () { prev(); restart(); });
    if (nx) nx.addEventListener('click', function () { next(); restart(); });
    var sx = 0, sy = 0, sw = false;
    root.addEventListener('touchstart', function (e) { var t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; sw = true; }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (!sw) return; sw = false;
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) { if (dx < 0) next(); else prev(); restart(); }
    }, { passive: true });
    heroPause = function () { if (heroTimer) { clearInterval(heroTimer); heroTimer = null; } };
    heroResume = restart;
    root.addEventListener('mouseenter', function () { if (heroPause) heroPause(); });
    root.addEventListener('mouseleave', function () { if (heroResume) heroResume(); });
    show(0); restart();
  }

  // ─────────────────────────── PILLARS ───────────────────────────
  function goStat(i) {
    var sec = document.getElementById('ecodiseno');
    if (!sec) return;
    var total = sec.offsetHeight - window.innerHeight;
    var target = sec.offsetTop + total * ((i + 0.5) / 4);
    window.scrollTo({ top: target, behavior: 'smooth' });
  }
  function setupPillars() {
    var sec = document.getElementById('ecodiseno');
    if (!sec) return;
    sec.querySelectorAll('[data-go]').forEach(function (b) {
      b.addEventListener('click', function () { goStat(parseInt(b.getAttribute('data-go'), 10)); });
    });
  }
  function tickPillars() {
    var sec = document.getElementById('ecodiseno');
    if (!sec) return;
    var total = sec.offsetHeight - window.innerHeight;
    var scrolled = Math.min(total, Math.max(0, -sec.getBoundingClientRect().top));
    var prog = total > 0 ? scrolled / total : 0;
    var seg = Math.min(3.999, prog * 4);
    var idx = Math.floor(seg);
    var frac = seg - idx;
    sec.querySelectorAll('.pill-scene').forEach(function (sc, k) {
      sc.style.opacity = (k === idx) ? '1' : '0';
      if (k === idx) {
        var img = sc.querySelector('.pill-img');
        if (img) img.style.transform = 'translateY(' + ((0.5 - frac) * 16) + 'vh) scale(1.08)';
        var txt = sc.querySelector('.pill-text');
        if (txt) txt.style.transform = 'translateY(' + ((0.5 - frac) * 64) + 'px)';
      }
    });
    var bar = document.getElementById('pill-prog');
    if (bar) bar.style.width = (frac * 100) + '%';
    var counter = document.getElementById('pill-counter');
    if (counter) counter.textContent = '0' + (idx + 1) + ' / 04';
    sec.querySelectorAll('.pill-ix').forEach(function (b, k) {
      b.style.opacity = (k === idx) ? '1' : '0.42';
      var num = b.querySelector('.pill-ix-num'); if (num) num.style.color = (k === idx) ? '#FF4D0E' : '#23211e';
      var line = b.querySelector('.pill-ix-line'); if (line) line.style.width = (k === idx) ? '34px' : '0';
    });
  }

  // ─────────────────────────── METHODOLOGY ───────────────────────────
  var procFill = null;
  function setupProcess() {
    var steps = Array.prototype.slice.call(document.querySelectorAll('[data-step]'));
    var fill = document.getElementById('proc-fill');
    var track = document.getElementById('proc-track');
    if (!steps.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        var node = e.target.querySelector('[data-node]');
        if (node) {
          node.style.borderColor = '#FF4D0E';
          node.style.color = '#FF4D0E';
          node.style.background = 'var(--bgnode)';
          node.style.animation = 'nodeGlow 2.2s ease-out infinite';
        }
        io.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    steps.forEach(function (s) { io.observe(s); });
    procFill = function () {
      if (!fill || !track) return;
      var r = track.getBoundingClientRect();
      var prog = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height));
      fill.style.height = (prog * 100) + '%';
    };
    procFill();
    window.addEventListener('scroll', procFill, { passive: true });
  }

  // ─────────────────────────── PROJECTS RAIL ───────────────────────────
  var proyScroll = null;
  function setupProjects() {
    var sec = document.getElementById('proyectos');
    var track = document.getElementById('proy-track');
    var bar = document.getElementById('proy-bar');
    var counter = document.getElementById('proy-counter');
    if (!sec || !track) return;
    var panels = track.children.length;
    proyScroll = function () {
      var total = sec.offsetHeight - window.innerHeight;
      var scrolled = Math.min(total, Math.max(0, -sec.getBoundingClientRect().top));
      var rawProg = total > 0 ? scrolled / total : 0;
      var PROG_END = 0.82;
      var prog = Math.min(1, rawProg / PROG_END);
      var maxX = track.scrollWidth - window.innerWidth;
      var steps = panels - 1;
      var p = prog * steps;
      var i = Math.floor(p);
      var fr = Math.min(1, Math.max(0, p - i));
      var mf = fr * fr * fr * (fr * (fr * 6 - 15) + 10);
      var pos = Math.min(steps, i + mf);
      track.style.transform = 'translateX(' + (-((pos / steps) * maxX)) + 'px)';
      if (bar) bar.style.width = ((pos / steps) * 100) + '%';
      if (counter) {
        var projects = panels - 1;
        var idx = Math.min(projects, Math.max(1, Math.floor(pos + 0.5) + 1));
        counter.textContent = ('0' + idx).slice(-2) + ' / 0' + projects;
      }
    };
    proyScroll();
    window.addEventListener('scroll', proyScroll, { passive: true });
    window.addEventListener('resize', proyScroll);
  }

  function startRaf() {
    function loop() {
      if (procFill) procFill();
      if (proyScroll) proyScroll();
      tickPillars();
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  // ─────────────────────────── STATS BAND ───────────────────────────
  function setupStats() {
    var stats = Array.prototype.slice.call(document.querySelectorAll('[data-stat]'));
    if (!stats.length) return;
    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
    function countUp(el) {
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var dur = 1500, start = performance.now();
      function step(now) {
        var p = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(ease(p) * target).toString();
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    function play(el) {
      var num = el.querySelector('[data-count]'); if (num) countUp(num);
      var rule = el.querySelector('[data-rule]'); if (rule) rule.style.width = '100%';
    }
    function reset(el) {
      var num = el.querySelector('[data-count]'); if (num) num.textContent = '0';
      var rule = el.querySelector('[data-rule]'); if (rule) rule.style.width = '0%';
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        play(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.45 });
    stats.forEach(function (s, i) {
      s.style.transitionDelay = (i * 0.09) + 's';
      io.observe(s);
      s.addEventListener('click', function () { reset(s); requestAnimationFrame(function () { requestAnimationFrame(function () { play(s); }); }); });
    });
  }

  // ─────────────────────────── LINEAR vs CIRCULAR ───────────────────────────
  var linealCards = [
    { label: 'Producción global', stat: '400Mt', desc: 'de plástico se producen cada año' },
    { label: 'Un solo uso', stat: '50%', desc: 'del plástico es descartable' },
    { label: 'Reciclaje real', stat: '9%', desc: 'del plástico se recicla efectivamente' },
    { label: 'Océanos', stat: '11Mt', desc: 'llegan al mar cada año' },
    { label: 'Permanencia', stat: '500', desc: 'años tarda en degradarse una botella' },
    { label: 'Telgopor', stat: '+1000', desc: 'años persiste el poliestireno expandido' },
    { label: 'Microplásticos', stat: '5g', desc: 'ingerimos por semana, ≈ una tarjeta' },
    { label: 'Destino final', stat: '79%', desc: 'del plástico termina en vertederos' }
  ];
  var circularCards = [
    { label: 'Materia prima', stat: '100%', desc: 'reciclada y con trazabilidad' },
    { label: 'Reciclabilidad', stat: '100%', desc: 'monomaterial, totalmente reciclable' },
    { label: 'Reutilización', stat: '∞', desc: 'ciclos en productos reutilizables' },
    { label: 'Origen', stat: 'Local', desc: 'proveedores y producción local' },
    { label: 'Impresión', stat: 'Agua', desc: 'tintas al agua, sin solventes' },
    { label: 'Residuos', stat: '→ Recursos', desc: 'de basura a materia prima' },
    { label: 'Huella', stat: '−CO₂', desc: 'menos kilos de CO₂ emitidos' },
    { label: 'Diseño', stat: '+ Vida', desc: 'productos pensados para durar' }
  ];
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function choiceCardHTML(c) {
    return '<div style="background:var(--surface); border:1px solid var(--line3); border-radius:16px; padding:24px; min-height:200px; display:flex; flex-direction:column;">'
      + '<span style="font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:var(--muted); font-weight:600;">' + esc(c.label) + '</span>'
      + '<span style="margin-top:auto; font-weight:300; font-size:38px; color:var(--fg); line-height:1;">' + esc(c.stat) + '</span>'
      + '<span style="margin-top:12px; font-size:14px; color:var(--muted); font-weight:300; line-height:1.4;">' + esc(c.desc) + '</span></div>';
  }
  function setupChoice() {
    var grid = document.getElementById('choice-grid');
    var bLin = document.getElementById('btn-lineal');
    var bCir = document.getElementById('btn-circular');
    if (!grid || !bLin || !bCir) return;
    var pillBase = 'padding:10px 22px; border-radius:100px; font-size:15px; font-weight:500; cursor:pointer; transition:all .3s; white-space:nowrap;';
    function render(choice) {
      var list = choice === 0 ? linealCards : circularCards;
      grid.innerHTML = list.map(choiceCardHTML).join('');
      bLin.setAttribute('style', pillBase + (choice === 0 ? 'background:#FF4D0E; color:var(--onimg);' : 'background:transparent; color:var(--muted);'));
      bCir.setAttribute('style', pillBase + (choice === 1 ? 'background:#FF4D0E; color:var(--onimg);' : 'background:transparent; color:var(--muted);'));
      // keep freshly rendered cards translated if a non-default language is active
      try {
        var lang = localStorage.getItem('xipa-lang') || 'es';
        if (lang !== 'es' && window.XIPA_I18N) window.XIPA_I18N.apply(grid, lang);
      } catch (e) {}
    }
    bLin.addEventListener('click', function () { render(0); });
    bCir.addEventListener('click', function () { render(1); });
    render(0);
  }

  // ─────────────────────────── TEAM GRID ───────────────────────────
  function setupTeam() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.tm[data-team]'));
    if (!cards.length) return;
    var selected = -1;
    function apply() {
      cards.forEach(function (card, i) {
        var grow = '1', op = '1';
        if (selected === i) grow = '2.6';
        else if (selected >= 0) { grow = '0.78'; op = '0.55'; }
        card.style.flex = grow;
        card.style.opacity = op;
        var info = card.querySelector('[data-team-info]');
        if (info) {
          var open = selected === i;
          info.style.maxHeight = open ? '220px' : '0';
          info.style.opacity = open ? '1' : '0';
        }
      });
    }
    cards.forEach(function (card, i) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('a')) return; // let LinkedIn links work
        selected = (selected === i) ? -1 : i;
        apply();
      });
    });
  }

  // ─────────────────────────── NEWSLETTER ───────────────────────────
  function setupNewsletter() {
    var form = document.getElementById('news-form');
    var ok = document.getElementById('news-ok');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      if (ok) ok.style.display = 'block';
    });
  }

  ready(function () {
    setupHero();
    setupPillars();
    setupProcess();
    setupProjects();
    startRaf();
    setupStats();
    setupChoice();
    setupTeam();
    setupNewsletter();
  });
})();
