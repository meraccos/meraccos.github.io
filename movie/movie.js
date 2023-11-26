// Select the slider, value, output and info elements
var names = document.querySelectorAll('.movie_name');
var ratings = document.querySelectorAll('.rating');
var aligns = document.querySelectorAll('.align');
var sliders = document.querySelectorAll(".slider")
var values = document.querySelectorAll('.value')
var ValuesArray = []

// fill value elements with slider values and array with the values
for (let i = 0; i < sliders.length; i++) {
    values[i].innerHTML = (sliders[i].value / 100).toFixed(2);
    ValuesArray.push(sliders[i].value / 100);

    sliders[i].oninput = function() {
        values[i].innerHTML = (this.value / 100).toFixed(2);
        ValuesArray[i] = sliders[i].value / 100;
    };
}

// Function for reading the movie names
async function readMovieNames() {
    const response = await fetch('names.txt');
    const data = await response.text();
    const lines = data.split('\n');
    return lines;
}

// Function for reading the movie ratings
async function readMovieRatings() {
    const response = await fetch('ratings.txt');
    const data = await response.text();
    const lines = data.split('\n');
    return lines;
}

// main things going on here
async function recommend() {
    try {
        // Read the movie names file
        const movie_names = await readMovieNames();
        const movie_ratings = await readMovieRatings();

        // Infer from the model 
        var data = Float32Array.from(ValuesArray);
        const tensor = new ort.Tensor("float32", data, [18]); 
        
        const session = await ort.InferenceSession.create('/movie/model.onnx');
        const feeds = {"onnx::MatMul_0": tensor};
        const run_out = await session.run(feeds);
        const output = run_out[5]['data']
        
        // Extract top 10 indices
        let indices = Array.from({ length: output.length }, (_, i) => i);
        indices.sort((a, b) => output[b] - output[a]);
        let top10Indices = indices.slice(0, 10);

        names[0].innerHTML = "<b> Movie Name";
        ratings[0].innerHTML = "<b>Rating";
        aligns[0].innerHTML = "<b>Match";

        // Print out the movies
        for (let i = 0; i < top10Indices.length; i++) {
            names[i+1].innerHTML = i+1 + '.  ' + movie_names[top10Indices[i]];
            ratings[i+1].innerHTML = movie_ratings[top10Indices[i]];
            aligns[i+1].innerHTML = (output[top10Indices[i]]).toFixed(2);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}
