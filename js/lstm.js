async function forward(x, h, c) {
    const session = await ort.InferenceSession.create("/models/lstm_nizami.onnx");
    const feeds = { "input.1": x, "onnx::Unsqueeze_1":h, "onnx::Unsqueeze_2":c};
    const results = await session.run(feeds);

    h = results[87].data;
    c = results[89].data;
    logits = results[90].data;

    h = new ort.Tensor("float32", h, [1, 256])
    c = new ort.Tensor("float32", c, [1, 256])
    
    return { logits, h, c };
}

function zeroTensor(n_zeros) {
    data = [];
    for (let j = 0; j < n_zeros; j++) {
        data.push(0);
    }

    array = Float32Array.from(data);
    tensor = new ort.Tensor("float32", array, [1, n_zeros])
    return tensor;
}

function generateText() {
    const button = document.getElementById('generate_button');
    const inputElement = document.getElementById("inputText");
    const userInput = inputElement.value;
    const outputElement = document.getElementById("output");
    let generatedText = "";

    (async () => {

        button.disabled = true;
        var x = Int32Array.from([0]);
        var h = zeroTensor(256)
        var c = zeroTensor(256)
        const characterDictionary = await readCharacterEncodingFile();

        for (let j = 0; j < userInput; j++) {
            const x_ = new ort.Tensor("int32", x, [1])
            var { logits, h, c } = await forward(x_, h, c);

            const probs = softmax(logits);
            const sampled_idx = multinomial(probs);
            const sampled_char = characterDictionary[sampled_idx];
            generatedText += sampled_char;
            outputElement.innerHTML = generatedText;

            x = Int32Array.from([sampled_idx]);
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
