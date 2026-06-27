/* Xipa — mobile hamburger drawer (vanilla, delegated, double-exec guarded).
   Independent of theme/lang wiring so it works on every page including the home. */
(function () {
  if (window.__xipaMenu) return; window.__xipaMenu = true;
  function close(d){ if(d){ d.style.display='none'; try{ document.body.style.overflow=''; }catch(e){} } }
  document.addEventListener('click', function (e){
    var burg = e.target.closest && e.target.closest('#hburg');
    if (burg){
      e.preventDefault();
      var d = document.getElementById('mobile-drawer');
      if (d){ var open = d.style.display === 'flex'; d.style.display = open ? 'none' : 'flex'; try{ document.body.style.overflow = open ? '' : 'hidden'; }catch(err){} }
      return;
    }
    var inDrawer = e.target.closest && e.target.closest('#mobile-drawer');
    if (inDrawer){
      if (e.target.closest('a') || e.target.closest('[data-drawer-close]') || e.target.id === 'mobile-drawer'){
        close(document.getElementById('mobile-drawer'));
      }
    }
  });
})();
