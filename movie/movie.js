var sliders = document.querySelectorAll(".slider")
var values = document.querySelectorAll('.value')

for (let i = 0; i < sliders.length; i++) {
    values[i].innerHTML = sliders[i].value / 100;

    sliders[i].oninput = function() {
        values[i].innerHTML = (this.value / 100).toFixed(2);
    };
}

