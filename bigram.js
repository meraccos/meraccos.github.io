async function forward(x) {
    const session = await ort.InferenceSession.create('/model.onnx');
    const feeds = { "input": x };
    const results = await session.run(feeds);
    const logits = results[13].data
    
    return logits
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


function softmax(logits) {
    console.log(logits)
    var exp_logits = [];
    var sum_exp_logits = 0.0;
    var exp_logit = 0.0;
    for (let j = 0; j < logits.length; j++) {
        exp_logit = Math.pow(Math.E, logits[j])
        exp_logits.push(exp_logit);
        sum_exp_logits += exp_logit;
    }

    var probs = [];
    for (let j = 0; j < logits.length; j++) {
        probs.push(exp_logits[j] / sum_exp_logits)
    }

    var sum_probs = 0.0
    for (let j = 0; j < probs.length; j++) {
        sum_probs += probs[j]
    }
}

function multinomial(logits){
    probs = softmax(logits)
    
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
            const logits = await forward(tensorA);
            const sampled_idx = multinomial(logits);
            // inefficient
            const characterDictionary = await readCharacterEncodingFile();

            const sampled_char = characterDictionary[sampled_idx];
            // console.log("Max character:", sampled_char);

            generatedText += sampled_char;
            outputElement.innerHTML = generatedText;

            dataA = Int32Array.from([sampled_idx]);
        }
    })();
}
