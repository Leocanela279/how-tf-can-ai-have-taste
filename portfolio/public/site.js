(function () {
  var clock = document.getElementById('bcn');
  if (clock) {
    var fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit'
    });
    var tick = function () { clock.textContent = 'Barcelona ' + fmt.format(new Date()); };
    tick();
    setInterval(tick, 15000);
  }

  var root = document.documentElement;
  var button = document.querySelector('.theme');
  if (!button) return;
  var systemDark = matchMedia('(prefers-color-scheme: dark)');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');

  function current() {
    return root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
  }
  function sync() {
    var dark = current() === 'dark';
    button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.content = dark ? '#0f0e0c' : '#fafaf8';
    });
  }
  function apply(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (e) {}
    sync();
  }

  button.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition || reduce.matches) { apply(next); return; }
    var r = button.getBoundingClientRect();
    var x = r.left + r.width / 2;
    var y = r.top + r.height / 2;
    var end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    /* The circle is a CSS animation on the new root. The variables are set before the
       snapshot; the class stays until the full 360ms transition finishes. */
    root.style.setProperty('--theme-x', x + 'px');
    root.style.setProperty('--theme-y', y + 'px');
    root.style.setProperty('--theme-r', end + 'px');
    root.classList.add('theme-transition');
    var clean = function () {
      root.classList.remove('theme-transition');
      root.style.removeProperty('--theme-x');
      root.style.removeProperty('--theme-y');
      root.style.removeProperty('--theme-r');
    };
    var transition = document.startViewTransition(function () { apply(next); });
    transition.finished.then(clean, clean);
  });

  systemDark.addEventListener('change', sync);
  sync();
})();
