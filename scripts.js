const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const inputText = document.getElementById('inputText');
const outputBox = document.getElementById('output');
const generatorButton = document.getElementById('generate_button');

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('white-mode');
        inputText.classList.add('white-mode');
        outputBox.classList.add('white-mode');
        generatorButton.classList.add('white-mode');
    } else {
        body.classList.remove('white-mode');
        inputText.classList.remove('white-mode');
        outputBox.classList.remove('white-mode');
        generatorButton.classList.remove('white-mode');
    }
});

