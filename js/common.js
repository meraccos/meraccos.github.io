const darkModeToggle = document.getElementById('dark-mode-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const projectsButton = document.getElementById('dropbtn');
const projectsMenu = document.getElementById('myDropdown');

function setMobileMenu(open) {
    mobileMenu.hidden = !open;
    mobileMenuBtn.setAttribute('aria-expanded', String(open));
    mobileMenuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.querySelector('main').hidden = open;
    document.querySelector('footer').hidden = open;
}

mobileMenuBtn.addEventListener('click', () => {
    setMobileMenu(mobileMenu.hidden);
});

window.matchMedia('(min-width: 769px)').addEventListener('change', (event) => {
    if (event.matches) setMobileMenu(false);
});

function setProjectsMenu(open) {
    projectsMenu.classList.toggle('show', open);
    projectsButton.setAttribute('aria-expanded', String(open));
}

projectsButton.addEventListener('click', () => {
    setProjectsMenu(!projectsMenu.classList.contains('show'));
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) setProjectsMenu(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (projectsMenu.classList.contains('show')) {
            setProjectsMenu(false);
            projectsButton.focus();
        } else if (!mobileMenu.hidden) {
            setMobileMenu(false);
            mobileMenuBtn.focus();
        }
    }
});

// Handling the cookies

function setCookie(name, value, days, path) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = encodeURIComponent(value) +
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
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}

function toggleDarkMode() {
    const body = document.body;
    const dark_animation = document.getElementById('dark-animation')
    const white_animation = document.getElementById('white-animation')

    if (darkModeToggle.checked) {
      body.classList.add('white-mode');
      setCookie('darkMode', 'enabled', 365, "/");
      white_animation && (white_animation.style.display = 'none');
      dark_animation && (dark_animation.style.display = 'flex');
    } else {
      body.classList.remove('white-mode');
      setCookie('darkMode', 'disabled', 365, "/");
      white_animation && (white_animation.style.display = 'flex');
      dark_animation && (dark_animation.style.display = 'none');
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
