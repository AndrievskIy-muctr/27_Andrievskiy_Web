const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Get current theme
function getTheme() {
    return html.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

// Set theme and update UI
function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleText(theme);
}

// Update button text
function updateToggleText(theme) {
    const icon = theme === 'dark' ? '🌙' : '☀️';
    const label = theme === 'dark' ? ' Dark' : ' Light';
    toggle.textContent = window.innerWidth <= 400 ? icon : icon + label;
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

window.addEventListener('resize', () => updateToggleText(getTheme()));

// Initialize
updateToggleText(getTheme());

// Handle toggle click
toggle.addEventListener('click', () => {
    const current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});