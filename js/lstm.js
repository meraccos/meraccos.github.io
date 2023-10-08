async function forward_lstm(x, h, c) {
    const session = await ort.InferenceSession.create(MODEL.modelFile);
    const feeds = { "input.1": x, "onnx::Unsqueeze_1":h, "onnx::Unsqueeze_2":c};
    const results = await session.run(feeds);

    h = new ort.Tensor("float32", results[87].data, [1, 256])
    c = new ort.Tensor("float32", results[89].data, [1, 256])
    logits = results[90].data;

    return { logits, h, c };
};

async function generateLSTMText(userInput) {
    const button = document.getElementById('generate_button');
    const outputElement = document.getElementById("output");
    let generatedText = "";
    
    button.disabled = true;
    
    var x = Int32Array.from([0]);
    var h = zeroTensor(256);
    var c = zeroTensor(256);
    const characterDictionary = await readCharacterEncodingFile();

    for (let j = 0; j < userInput; j++) {
        const x_ = new ort.Tensor("int32", x, [1]);
        var { logits, h, c } = await forward_lstm(x_, h, c);

        const probs = softmax(logits);
        const sampled_idx = multinomial(probs);
        const sampled_char = characterDictionary[sampled_idx];
        generatedText += sampled_char;
        outputElement.innerHTML = generatedText;

        x = Int32Array.from([sampled_idx]);
    }

    button.disabled = false;
}

const inputElement = document.getElementById("inputText");
inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        generateText();
        event.preventDefault();
    }
});

selectedModel = 'bigram';
selectedDataset = 'nizami';

document.getElementById("nizami-button").click();
document.getElementById("bigram-button").click();
