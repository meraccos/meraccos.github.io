const darkModeToggle = document.getElementById('dark-mode-toggle');
const modeText = document.getElementById('mode-text');
const body = document.body;
const h1 = document.h1

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        h1.classList.add('dark-mode')
        modeText.textContent = 'Dark Mode';
    } else {
        body.classList.remove('dark-mode');
        h1.classList.remove('dark-mode')
        modeText.textContent = 'Light Mode';
    }
});