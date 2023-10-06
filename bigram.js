async function forward(x) {
    const session = await ort.InferenceSession.create('/model.onnx');
    const feeds = { "input": x };
    const results = await session.run(feeds);
    const output = results[13].data
    // console.log(output)
    
    const maxIndex = output.indexOf(Math.max(...output));
    return maxIndex
}

async function readCharacterEncodingFile() {
    const response = await fetch('/encodings/enc_tinyshakespeare.txt');
    const data = await response.text();
    const lines = data;
    var characterDictionary = {};
    for (let i = 0; i < lines.length; i++) {
        const character = lines[i].trim();
        characterDictionary[i] = character;
    }
    characterDictionary[0] = "\n";
    characterDictionary[1] = " ";

    return characterDictionary;
}

function generateText() {
    const inputElement = document.getElementById("inputText");
    const userInput = inputElement.value;
    const outputElement = document.getElementById("output");
    let generatedText = "";

    (async () => {
        var dataA = Int32Array.from([1]);

        for (let j = 0; j < userInput; j++) {
            const tensorA = new ort.Tensor("int32", dataA, []);
            const maxIndex = await forward(tensorA);
            const characterDictionary = await readCharacterEncodingFile();

            const maxChar = characterDictionary[maxIndex];
            console.log("Max character:", maxChar);

            generatedText += maxChar;
            outputElement.innerHTML = generatedText;

            dataA = Int32Array.from([maxIndex]);
        }
    })();
}
