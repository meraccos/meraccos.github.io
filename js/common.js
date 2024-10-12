const darkModeToggle = document.getElementById('dark-mode-toggle');

// Nav menu on mobile
var mobileMenuBtn = document.querySelector("#mobile-menu-btn");
var mobileMenu = document.querySelector(".mobile-menu");
var darkanimation = document.querySelector("#dark-animation")
var whiteanimation = document.querySelector("#white-animation")
var footer = document.querySelector("footer")
var main = document.querySelector("main")

mobileMenuBtn.addEventListener("click", () => {
    footer.style.display = "none"
    main.style.display = "none"
    if (mobileMenu.style.display === "none") {
      mobileMenu.style.display = "flex";
      if (darkanimation) {
        darkanimation.style.display = "none"
        whiteanimation.style.display = "none"
      }
    } 
    else {
      main.style.display = "block"
      footer.style.display = "block"
      mobileMenu.style.display = "none";
      if (darkanimation) {
        if (darkModeToggle.checked) {
            darkanimation.style.display = "flex"
          } else {
            whiteanimation.style.display = "flex"
          }
      }
    }
  });

// Handling the cookies

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