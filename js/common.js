const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const inputText = document.getElementById('inputText');
const outputBox = document.getElementById('output');
const generatorButton = document.getElementById('generate_button');
const nizamiButton = document.getElementById('nizami-button')
const shakespeareButton = document.getElementById('shakespeare-button')
const dt_ds = document.getElementById('dt_ds')
const dt_g = document.getElementById('dt_g')


darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('white-mode');
        inputText.classList.add('white-mode');
        outputBox.classList.add('white-mode');
        generatorButton.classList.add('white-mode');
        nizamiButton.classList.add('white-mode');
        shakespeareButton.classList.add('white-mode');
        dt_ds.classList.add('white-mode');
        dt_g.classList.add('white-mode');
    } else {
        body.classList.remove('white-mode');
        inputText.classList.remove('white-mode');
        outputBox.classList.remove('white-mode');
        generatorButton.classList.remove('white-mode');
        nizamiButton.classList.remove('white-mode');
        shakespeareButton.classList.remove('white-mode');
        dt_ds.classList.remove('white-mode');
        dt_g.classList.remove('white-mode');
    }
});

