var sliders = document.querySelectorAll(".slider")
var values = document.querySelectorAll('.value')
var ValuesArray = []

for (let i = 0; i < sliders.length; i++) {
    values[i].innerHTML = (sliders[i].value / 100).toFixed(2);
    ValuesArray.push(sliders[i].value / 100);

    sliders[i].oninput = function() {
        values[i].innerHTML = (this.value / 100).toFixed(2);
        ValuesArray[i] = sliders[i].value / 100;
    };
}

// var intervalId = setInterval(function() {
//     console.log(ValuesArray);
// }, 1000);

