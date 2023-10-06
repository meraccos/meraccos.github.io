const darkModeToggle = document.getElementById('dark-mode-toggle');
const modeText = document.getElementById('mode-text');
const body = document.body;
const h1 = document.h1

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('white-mode');
        h1.classList.add('white-mode')
        modeText.textContent = 'Dark Mode';
    } else {
        body.classList.remove('white-mode');
        h1.classList.remove('white-mode')
        modeText.textContent = 'Light Mode';
    }
});

