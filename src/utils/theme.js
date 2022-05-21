function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.setAttribute('data-theme', themeName);
}

function saveTheme() {
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('dark');
    } else if (localStorage.getItem('theme') === 'light') {
      setTheme('light');
    }
  } else {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
}

module.exports = {
  setTheme,
  saveTheme,
};
