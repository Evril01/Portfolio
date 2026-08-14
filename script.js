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

// Mobile navigation toggle
(function () {
  const root = document.documentElement;
  const navToggle = document.getElementById('nav-toggle');
  if (!navToggle) return;

  function syncNavState() {
    const menu = document.getElementById('primary-navigation');
    const isOpen = document.body.classList.contains('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (menu) {
      menu.setAttribute('aria-hidden', String(!isOpen));
    }
  }

  function closeNav() {
    document.body.classList.remove('nav-open');
    syncNavState();
  }

  function openNav() {
    document.body.classList.add('nav-open');
    syncNavState();
  }

  navToggle.addEventListener('click', function () {
    if (document.body.classList.contains('nav-open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  document.addEventListener('click', function (e) {
    const target = e.target;
    if (target.tagName === 'A' && target.closest('.mobile-menu')) {
      closeNav();
    }
  });

  document.addEventListener('click', function (e) {
    const path = e.composedPath ? e.composedPath() : (e.path || []);
    if (!path.some(node => node && (node.id === 'primary-navigation' || node.id === 'nav-toggle'))) {
      if (document.body.classList.contains('nav-open')) closeNav();
    }
  });

  syncNavState();
})();
