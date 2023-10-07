async function forward(x) {
    const session = await ort.InferenceSession.create(currentDataset.modelFile);
    const feeds = { "input": x };
    const results = await session.run(feeds);
    const logits = results[13].data
    
    return logits
}

function generateText() {
    const button = document.getElementById('generate_button');
    const inputElement = document.getElementById("inputText");
    const userInput = inputElement.value;
    const outputElement = document.getElementById("output");
    let generatedText = "";

    (async () => {

        button.disabled = true;
        var dataA = Int32Array.from([1]);
        const characterDictionary = await readCharacterEncodingFile();

        for (let j = 0; j < userInput; j++) {
            const tensorA = new ort.Tensor("int32", dataA, []);
            const logits = await forward(tensorA);
            const probs = softmax(logits);
            const sampled_idx = multinomial(probs);
            const sampled_char = characterDictionary[sampled_idx];

            generatedText += sampled_char;
            outputElement.innerHTML = generatedText;

            dataA = Int32Array.from([sampled_idx]);
        }
        button.disabled = false;
    })();
}

const inputElement = document.getElementById("inputText");
inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        generateText();
        event.preventDefault();
    }
});

document.getElementById("nizami-button").click();
document.getElementById("bigram-button").click();
