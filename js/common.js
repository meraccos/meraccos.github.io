const darkModeToggle = document.getElementById('dark-mode-toggle');

function setCookie(name, value, days, path) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = escape(value) +
        ((days == null) ? "" : "; expires=" + expirationDate.toUTCString()) +
        (path ? "; path=" + path : "") +
        "; domain=" + window.location.hostname;
    document.cookie = name + "=" + cookieValue;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return unescape(cookie.substring(name.length + 1));
        }
    }
    return null;
}

function toggleDarkMode() {
    const body = document.body;
    const inputText = document.getElementById('inputText');
    const outputBox = document.getElementById('output');
    const generatorButton = document.getElementById('generate_button');
    const nizamiButton = document.getElementById('nizami-button');
    const shakespeareButton = document.getElementById('shakespeare-button');
    const bigramButton = document.getElementById('bigram-button');
    const lstmButton = document.getElementById('lstm-button');
    const dt_ds = document.getElementById('dt_ds');
    const dt_g = document.getElementById('dt_g');
    const dt_m = document.getElementById('dt_m')

    if (darkModeToggle.checked) {
        body.classList.add('white-mode');
        inputText && inputText.classList.add('white-mode');
        outputBox && outputBox.classList.add('white-mode');
        generatorButton && generatorButton.classList.add('white-mode');
        nizamiButton && nizamiButton.classList.add('white-mode');
        shakespeareButton && shakespeareButton.classList.add('white-mode');
        bigramButton && bigramButton.classList.add('white-mode');
        lstmButton && lstmButton.classList.add('white-mode');
        dt_ds && dt_ds.classList.add('white-mode');
        dt_g && dt_g.classList.add('white-mode');
        dt_m && dt_m.classList.add('white-mode');
        setCookie('darkMode', 'enabled', 365, "/");
    } else {
        body.classList.remove('white-mode');
        inputText && inputText.classList.remove('white-mode');
        outputBox && outputBox.classList.remove('white-mode');
        generatorButton && generatorButton.classList.remove('white-mode');
        nizamiButton && nizamiButton.classList.remove('white-mode');
        shakespeareButton && shakespeareButton.classList.remove('white-mode');
        bigramButton && bigramButton.classList.remove('white-mode');
        lstmButton && lstmButton.classList.remove('white-mode');
        dt_ds && dt_ds.classList.remove('white-mode');
        dt_g && dt_g.classList.remove('white-mode');
        dt_m && dt_m.classList.remove('white-mode');
        setCookie('darkMode', 'disabled', 365, "/");
    }
};


const darkModeCookie = getCookie('darkMode');
if (darkModeCookie === 'enabled') {
    darkModeToggle.checked = true;
    toggleDarkMode();
} else {
    darkModeToggle.checked = false;
    toggleDarkMode();
}

darkModeToggle.addEventListener('change', toggleDarkMode);

