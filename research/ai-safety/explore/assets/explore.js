/* Shared chrome: top bar, theme toggle, tiny helpers. Pages call Explore.chrome('taxonomy'). */
window.Explore = (function () {
  const PAGES = [['taxonomy','Taxonomy'],['vocabulary','Vocabulary'],['goodhart-plane','Goodhart Plane'],['environments','Environments'],['incidents','Incidents']];
  const store = { get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }, set(k,v){ try { localStorage.setItem(k,v); } catch(e){} } };
  function applyTheme(t){ if (t) document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme'); }
  applyTheme(store.get('explore-theme'));
  function chrome(current){
    const bar = document.createElement('header'); bar.className = 'topbar';
    bar.innerHTML = '<a class="brand" href="../../">AI Safety Research</a><nav aria-label="Explorers">' +
      PAGES.map(([s,n]) => '<a href="../' + s + '/"' + (s===current ? ' aria-current="page"' : '') + '>' + n + '</a>').join('') +
      '</nav><span class="spacer"></span><button class="iconbtn" id="themebtn" type="button" aria-label="Toggle light or dark theme">Theme</button>';
    document.body.prepend(bar);
    document.getElementById('themebtn').addEventListener('click', () => {
      const dark = (document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
      const next = dark ? 'light' : 'dark'; applyTheme(next); store.set('explore-theme', next);
    });
  }
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const areaOf = id => String(id).match(/^[A-Z]+/) ? String(id).match(/^[A-Z]+/)[0] : 'X';
  return { chrome, esc, store, areaOf };
})();
