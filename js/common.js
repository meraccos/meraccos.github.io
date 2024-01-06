const darkModeToggle = document.getElementById('dark-mode-toggle');

// Nav menu on mobile
var mobileMenuBtn = document.querySelector("#mobile-menu-btn");
var mobileMenu = document.querySelector(".mobile-menu");
var contents = document.querySelector(".content");
var darkanimation = document.querySelector("#dark-animation")
var whiteanimation = document.querySelector("#white-animation")
var contact = document.querySelector(".contact")
var problem = document.querySelector("#problem")
var dt = document.querySelector("#dt")
var dt2 = document.querySelector("#dt2")
var dt3 = document.querySelector("#dt3")
var references = document.querySelector("#references")
var modelswitch = document.querySelector("#switch1")
var modelswitch2 = document.querySelector("#switch2")
var generator = document.querySelector("#generator")
var output = document.querySelector("#output")

mobileMenuBtn.addEventListener("click", () => {
    if (mobileMenu.style.display === "none") {
      mobileMenu.style.display = "flex";
      if (contents) {
        contents.style.display = "none"
      }
      if (generator) {
        generator.style.display = "none"
      }
      if (output) {
        output.style.display = "none"
      }
      if (modelswitch) {
        modelswitch.style.display = "none"
      }
      if (modelswitch2) {
        modelswitch2.style.display = "none"
      }
      if (darkanimation) {
        darkanimation.style.display = "none"
        whiteanimation.style.display = "none"
      }
      if (references) {
        references.style.display = "none"
      }
      if (contact) {
        contact.style.display = "none"
      }
      if (dt) {
        dt.style.display = "none"
      }
      if (dt2) {
        dt2.style.display = "none"
      }
      if (dt3) {
        dt3.style.display = "none"
      }
      if (problem) {
        problem.style.display = "none"
      }
      
    } 
    else {
      mobileMenu.style.display = "none";
      if (contents) {
        contents.style.display = "flex"
      }   
      if (generator) {
        generator.style.display = "flex"
      }     
      if (output) {
        output.style.display = "flex"
      }      
      if (modelswitch) {
        modelswitch.style.display = "flex"
      }
      if (modelswitch2) {
        modelswitch2.style.display = "flex"
      }
      if (references) {
        references.style.display = "block"
      }
      if (contact) {
        contact.style.display = "flex"
      }
      if (problem) {
        problem.style.display = "flex"
      }
      if (dt) {
        dt.style.display = "block"
      }
      if (dt2) {
        dt2.style.display = "block"
      }
      if (dt3) {
        dt3.style.display = "block"
      }
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

// All the dark-white mode style changes

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
    const projectMenu = document.getElementById('myDropdown')
    const projectButton = document.getElementById('dropbtn')
    const darkmodeContainer = document.getElementById('darkmode-container')
    const menuLines = document.getElementsByClassName('line')

    // Movies
    const movieOutputBox = document.getElementById('outputs-box')
    const movieInputBox = document.getElementById('inputs-box')
    const movieButton = document.getElementById('movie_button')
    const movieAlign = document.getElementsByClassName('align')
    const movieRating = document.getElementsByClassName('rating')

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
        projectMenu && projectMenu.classList.add('white-mode');
        projectButton && projectButton.classList.add('white-mode');
        movieOutputBox && movieOutputBox.classList.add('white-mode');
        movieInputBox && movieInputBox.classList.add('white-mode');
        movieButton && movieButton.classList.add('white-mode');
        darkmodeContainer.classList.add('white-mode')
        for (var i = 0; i < movieAlign.length; i++) {
            movieAlign[i] && movieAlign[i].classList.add('white-mode');
            movieRating[i] && movieRating[i].classList.add('white-mode');
        }
        for (var i = 0; i < menuLines.length; i++) {
            menuLines[i] && menuLines[i].classList.add('white-mode');
        }
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
        projectMenu && projectMenu.classList.remove('white-mode');
        projectButton && projectButton.classList.remove('white-mode');
        movieOutputBox && movieOutputBox.classList.remove('white-mode');
        movieInputBox && movieInputBox.classList.remove('white-mode');
        movieButton && movieButton.classList.remove('white-mode');
        darkmodeContainer.classList.remove('white-mode')
        for (var i = 0; i < movieAlign.length; i++) {
            movieAlign[i] && movieAlign[i].classList.remove('white-mode');
            movieRating[i] && movieRating[i].classList.remove('white-mode');
        }
        for (var i = 0; i < menuLines.length; i++) {
            menuLines[i] && menuLines[i].classList.remove('white-mode');
        }
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