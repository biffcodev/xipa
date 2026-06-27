/* Xipa — style-hover shim.
   Applies the CSS declarations in a `style-hover="..."` attribute while the
   pointer is over the element, restoring the prior inline values on leave.
   Reproduces the Claude Design runtime's hover behaviour for the static site. */
(function () {
  if (window.__xipaHover) return; window.__xipaHover = true;

  function parseDecls(s) {
    return (s || '').split(';').map(function (r) { return r.trim(); }).filter(Boolean)
      .map(function (r) { var i = r.indexOf(':'); return [r.slice(0, i).trim(), r.slice(i + 1).trim()]; })
      .filter(function (d) { return d[0]; });
  }

  function wire(el) {
    if (el.__hoverWired) return; el.__hoverWired = true;
    var decls = parseDecls(el.getAttribute('style-hover'));
    if (!decls.length) return;
    el.addEventListener('mouseenter', function () {
      el.__hoverPrev = decls.map(function (d) { return [d[0], el.style.getPropertyValue(d[0])]; });
      decls.forEach(function (d) { el.style.setProperty(d[0], d[1]); });
    });
    el.addEventListener('mouseleave', function () {
      (el.__hoverPrev || []).forEach(function (p) {
        if (p[1]) el.style.setProperty(p[0], p[1]); else el.style.removeProperty(p[0]);
      });
    });
  }

  function scan() { document.querySelectorAll('[style-hover]').forEach(wire); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
  var n = 0, iv = setInterval(function () { scan(); if (++n > 12) clearInterval(iv); }, 150);
})();
