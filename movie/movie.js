// Select the slider, value and output elements
var outputs = document.querySelectorAll('.output');
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
async function readCharacterEncodingFile() {
    const response = await fetch('names.txt');
    const data = await response.text();
    const lines = data.split('\n');
    return lines;
}

// main things going on here
async function recommend() {
    try {
        // Read the movie names file
        const movie_names = await readCharacterEncodingFile();

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
        
        // Extract movie names from indices and print the result
        for (let i = 0; i < top10Indices.length; i++) {
            for (let j = 0; j < movie_names.length; j++) {
                if (j == top10Indices[i]) {
                    outputs[i].innerHTML = i+1 + '.  ' + movie_names[j]   
                }
            }  
        }

    } catch (error) {
        console.error('Error:', error);
    }
}
