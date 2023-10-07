async function forward_bigram(x) {
    const session = await ort.InferenceSession.create(MODEL.modelFile);
    const feeds = { "input": x };
    const results = await session.run(feeds);
    const logits = results[13].data
    return logits
}

async function generateBigramText(userInput) {
    const button = document.getElementById('generate_button');
    const outputElement = document.getElementById("output");
    let generatedText = "";
    
    button.disabled = true;

    var dataA = Int32Array.from([1]);
    const characterDictionary = await readCharacterEncodingFile();

    for (let j = 0; j < userInput; j++) {
        const tensorA = new ort.Tensor("int32", dataA, []);
        const logits = await forward_bigram(tensorA);
        const probs = softmax(logits);
        const sampled_idx = multinomial(probs);
        const sampled_char = characterDictionary[sampled_idx];

        generatedText += sampled_char;
        outputElement.innerHTML = generatedText;

        dataA = Int32Array.from([sampled_idx]);
    }

    button.disabled = false;
}
