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
    const dt = document.getElementById('dt');
    const dt2 = document.getElementById('dt2');
    const dt3 = document.getElementById('dt3')
    const contact_icon = document.getElementById('contact')
    const container = document.getElementById('container');
    const dark_animation = document.getElementById('dark-animation')
    const white_animation = document.getElementById('white-animation')

    // Movies
    const movieOutputBox = document.getElementById('outputs-box')
    const movieInputBox = document.getElementById('inputs-box')
    const movieButton = document.getElementById('movie_button')

    if (darkModeToggle.checked) {
        body.classList.add('white-mode');
        inputText && inputText.classList.add('white-mode');
        outputBox && outputBox.classList.add('white-mode');
        generatorButton && generatorButton.classList.add('white-mode');
        nizamiButton && nizamiButton.classList.add('white-mode');
        shakespeareButton && shakespeareButton.classList.add('white-mode');
        bigramButton && bigramButton.classList.add('white-mode');
        lstmButton && lstmButton.classList.add('white-mode');
        dt && dt.classList.add('white-mode');
        dt2 && dt2.classList.add('white-mode');
        dt3 && dt3.classList.add('white-mode');
        container && container.classList.add('white-mode');
        contact_icon && contact_icon.classList.add('white-mode');
        movieOutputBox && movieOutputBox.classList.add('white-mode');
        movieInputBox && movieInputBox.classList.add('white-mode');
        movieButton && movieButton.classList.add('white-mode');
        white_animation && (white_animation.style.display = 'none');
        dark_animation && (dark_animation.style.display = 'flex');
        setCookie('darkMode', 'enabled', 365, "/");
        console.log('checked')
    } else {
        body.classList.remove('white-mode');
        inputText && inputText.classList.remove('white-mode');
        outputBox && outputBox.classList.remove('white-mode');
        generatorButton && generatorButton.classList.remove('white-mode');
        nizamiButton && nizamiButton.classList.remove('white-mode');
        shakespeareButton && shakespeareButton.classList.remove('white-mode');
        bigramButton && bigramButton.classList.remove('white-mode');
        lstmButton && lstmButton.classList.remove('white-mode');
        dt && dt.classList.remove('white-mode');
        dt2 && dt2.classList.remove('white-mode');
        dt3 && dt3.classList.remove('white-mode');
        container && container.classList.remove('white-mode');
        contact_icon && contact_icon.classList.remove('white-mode');
        movieOutputBox && movieOutputBox.classList.remove('white-mode');
        movieInputBox && movieInputBox.classList.remove('white-mode');
        movieButton && movieButton.classList.remove('white-mode');
        white_animation && (white_animation.style.display = 'flex');
        dark_animation && (dark_animation.style.display = 'none');
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


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function ProjectsMenuFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    }
    
    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
        }
    }
}