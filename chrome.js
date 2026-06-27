/* Xipa — shared nav/footer chrome for subpages (vanilla, delegation-based so it
   survives the DC runtime mounting the template after this script loads).
   Theme toggle + icon, language menu, nav collapse on scroll — mirrors the home. */
(function () {
  if (window.__xipaChrome) return;
  window.__xipaChrome = true;
  var MOON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/><line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/><line x1="4.6" y1="4.6" x2="6.4" y2="6.4"/><line x1="17.6" y1="17.6" x2="19.4" y2="19.4"/><line x1="4.6" y1="19.4" x2="6.4" y2="17.6"/><line x1="17.6" y1="6.4" x2="19.4" y2="4.6"/></svg>';

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  function applyTheme(t) {
    var root = document.getElementById('site');
    if (!root) return;
    root.setAttribute('data-theme', t);
    var icon = document.getElementById('theme-icon');
    if (icon) icon.innerHTML = (t === 'dark') ? SUN : MOON;
  }

  function applyI18n(l) {
    var tries = 0;
    (function w() {
      if (window.XIPA_I18N) window.XIPA_I18N.apply(document.getElementById('site'), l);
      else if (tries++ < 60) setTimeout(w, 60);
    })();
  }

  function highlightLang(l) {
    var menu = document.getElementById('lang-menu');
    if (!menu) return;
    menu.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === l;
      b.style.background = on ? 'rgba(255,77,14,0.9)' : 'transparent';
      b.style.color = on ? '#fff' : 'rgba(255,255,255,0.7)';
      b.style.fontWeight = on ? '600' : '400';
    });
  }

  function setLang(l) {
    store('xipa-lang', l);
    applyI18n(l);
    highlightLang(l);
  }

  // ---- delegated clicks (survive DC re-render) ----
  document.addEventListener('click', function (e) {
    var themeBtn = e.target.closest && e.target.closest('#theme-toggle');
    if (themeBtn) {
      var root = document.getElementById('site');
      var next = (root && root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
      store('xipa-theme', next);
      applyTheme(next);
      return;
    }
    var langBtn = e.target.closest && e.target.closest('#lang-btn');
    if (langBtn) {
      e.stopPropagation();
      var menu = document.getElementById('lang-menu');
      if (menu) menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
      return;
    }
    var langItem = e.target.closest && e.target.closest('#lang-menu [data-lang]');
    if (langItem) {
      e.stopPropagation();
      setLang(langItem.getAttribute('data-lang'));
      var m = document.getElementById('lang-menu');
      if (m) m.style.display = 'none';
      return;
    }
    // click outside → close lang menu
    if (!(e.target.closest && e.target.closest('#lang-ctrl'))) {
      var lm = document.getElementById('lang-menu');
      if (lm && lm.style.display === 'flex') lm.style.display = 'none';
    }
  });

  // ---- nav collapse on scroll (queries fresh nodes each time) ----
  var lastY = window.scrollY;
  var collapsed = null;
  var expandTimer = null;
  function setCollapsed(c) {
    var pill = document.getElementById('navpill');
    var links = document.getElementById('navlinks');
    if (!pill || !links) return;
    if (!pill.dataset.tw) { pill.style.transition = 'width .55s cubic-bezier(.4,0,.2,1), padding .55s, justify-content .3s, opacity .4s ease, transform .45s ease'; pill.dataset.tw = '1'; }
    if (c === collapsed) return;
    collapsed = c;
    pill.style.width = c ? '260px' : 'calc(100% - 80px)';
    pill.style.justifyContent = c ? 'center' : 'space-between';
    links.style.opacity = c ? '0' : '1';
    links.style.pointerEvents = c ? 'none' : 'auto';
    links.style.width = c ? '0' : 'auto';
    links.style.overflow = 'hidden';
  }
  window.addEventListener('scroll', function () {
    var pill = document.getElementById('navpill');
    if (!pill) return;
    var y = window.scrollY;
    var goingDown = y > lastY;
    if (y <= 60) { if (expandTimer) { clearTimeout(expandTimer); expandTimer = null; } setCollapsed(false); }
    else if (goingDown) { if (expandTimer) { clearTimeout(expandTimer); expandTimer = null; } setCollapsed(true); }
    else if (!expandTimer) { expandTimer = setTimeout(function () { expandTimer = null; setCollapsed(false); }, 280); }
    var footer = document.getElementById('contacto') || document.getElementById('site-footer');
    if (footer) {
      var atFooter = footer.getBoundingClientRect().top <= window.innerHeight * 0.5;
      pill.style.opacity = atFooter ? '0' : '1';
      pill.style.pointerEvents = atFooter ? 'none' : 'auto';
      pill.style.transform = atFooter ? 'translateX(-50%) translateY(-150%)' : 'translateX(-50%)';
    }
    lastY = y;
  }, { passive: true });

  // ---- apply persisted theme/lang once the template has mounted ----
  var tries = 0;
  (function ready() {
    if (document.getElementById('site') && document.getElementById('theme-icon')) {
      applyTheme(store('xipa-theme') || 'light');
      var l = store('xipa-lang') || 'es';
      highlightLang(l);
      if (l !== 'es') applyI18n(l);
      return;
    }
    if (tries++ < 100) setTimeout(ready, 50);
  })();
})();
