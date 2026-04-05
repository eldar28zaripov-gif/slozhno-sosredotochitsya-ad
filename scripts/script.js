const themeButtons = document.querySelectorAll('.header__theme-menu-button');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function getPreferredTheme() {
  return prefersDarkScheme.matches ? 'dark' : 'light';
}

function changeTheme(theme) {
  document.body.className = 'page';
  if (theme === 'auto') {
    document.body.classList.add(`theme_${getPreferredTheme()}`);
    document.body.classList.add('theme_auto');
  } else {
    document.body.classList.add(`theme_${theme}`);
  }
  localStorage.setItem('theme', theme);
}

function setActiveButton(theme) {
  themeButtons.forEach((btn) => {
    btn.classList.remove('header__theme-menu-button_active');
    btn.removeAttribute('disabled');
  });

  const activeButton = document.querySelector(`.header__theme-menu-button_type_${theme}`);
  if (activeButton) {
    activeButton.classList.add('header__theme-menu-button_active');
    activeButton.setAttribute('disabled', true);
  }
}

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const theme = [...button.classList].includes('header__theme-menu-button_type_light')
      ? 'light'
      : [...button.classList].includes('header__theme-menu-button_type_dark')
      ? 'dark'
      : 'auto';

    changeTheme(theme);
    setActiveButton(theme);
  });
});

function initTheme() {
  const storedTheme = localStorage.getItem('theme') || 'auto';
  changeTheme(storedTheme);
  setActiveButton(storedTheme);
}

prefersDarkScheme.addEventListener('change', () => {
  if (localStorage.getItem('theme') === 'auto') {
    changeTheme('auto');
  }
});

initTheme();
