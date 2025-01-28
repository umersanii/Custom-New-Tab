let switcher = document.getElementById('chb_theme');
let buttonApply = document.getElementById('color_apply');
let buttonReset = document.getElementById('color_reset');
let bgInput = document.getElementById('bg_input');
let fgInput = document.getElementById('fg_input');
let accentInput = document.getElementById('accent_input');

// Initialize theme based on saved preference or default
if (localStorage.getItem('theme') === 'dark') {
  applyTheme('dark');
} else {
  applyTheme('light');
}

// Event Listeners
switcher.addEventListener('click', () =>
  switcher.checked ? applyTheme('dark') : applyTheme('light')
);

buttonReset.addEventListener('click', resetColors);
buttonApply.addEventListener('click', applyCustomColors);

// Function to apply theme (light or dark)
function applyTheme(themeName) {
  switcher.checked = themeName === 'dark';
  localStorage.setItem('theme', themeName);
  document.body.setAttribute('theme', themeName);

  loadColors(themeName);
}

// Function to apply custom colors
function applyCustomColors() {
  const themeName = localStorage.getItem('theme');
  const root = document.querySelector(`[theme="${themeName}"]`);

  const bgColor = bgInput.value.trim();
  const fgColor = fgInput.value.trim();
  const accentColor = accentInput.value.trim();

  if (isValidColor(bgColor)) root.style.setProperty('--background', bgColor);
  if (isValidColor(fgColor)) root.style.setProperty('--foreground', fgColor);
  if (isValidColor(accentColor)) root.style.setProperty('--accent', accentColor);

  saveColors(themeName, {
    background: bgColor,
    foreground: fgColor,
    accent: accentColor,
  });
}

// Function to reset colors to default
function resetColors() {
  const themeName = localStorage.getItem('theme');
  const root = document.querySelector(`[theme="${themeName}"]`);

  root.style.removeProperty('--background');
  root.style.removeProperty('--foreground');
  root.style.removeProperty('--accent');

  saveDefaultColors(themeName);
  loadColors(themeName);
}

// Load and apply colors from localStorage
function loadColors(themeName) {
  const root = document.querySelector(`[theme="${themeName}"]`);

  if (localStorage.getItem(themeName)) {
    const colors = JSON.parse(localStorage.getItem(themeName));
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--foreground', colors.foreground);
    root.style.setProperty('--accent', colors.accent);

    bgInput.value = colors.background;
    fgInput.value = colors.foreground;
    accentInput.value = colors.accent;
  } else {
    saveDefaultColors(themeName);
    loadColors(themeName);
  }
}

// Save colors to localStorage
function saveColors(themeName, colors) {
  localStorage.setItem(themeName, JSON.stringify(colors));
}

// Save default colors for a theme
function saveDefaultColors(themeName) {
  const defaultColors = themeName === 'dark'
    ? { background: '#121212', foreground: '#ffffff', accent: '#bb86fc' }
    : { background: '#ffffff', foreground: '#000000', accent: '#6200ee' };

  saveColors(themeName, defaultColors);
}

// Validate if a color is valid (basic check)
function isValidColor(color) {
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
}
