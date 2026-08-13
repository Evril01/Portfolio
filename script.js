(function () {
  const root = document.documentElement;

  function applyThemeFromStorage() {
    try {
      const savedTheme = localStorage.getItem('theme');
      const useLightTheme = savedTheme === 'light';

      root.classList.toggle('light', useLightTheme);
      root.style.colorScheme = useLightTheme ? 'light' : 'dark';
    } catch (error) {
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    }

    root.classList.add('theme-ready');
  }

  function initThemeToggle() {
    const toggle = document.getElementById('theme-switch');
    if (!toggle) return;

    toggle.checked = root.classList.contains('light');

    toggle.addEventListener('change', function () {
      const isLight = this.checked;
      root.classList.toggle('light', isLight);
      root.style.colorScheme = isLight ? 'light' : 'dark';

      try {
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
      } catch (error) {
        // Ignore storage issues in restricted environments.
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyThemeFromStorage();
      initThemeToggle();
    });
  } else {
    applyThemeFromStorage();
    initThemeToggle();
  }
})();
