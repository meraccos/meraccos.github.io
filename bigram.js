async function forward(x) {
    const session = await ort.InferenceSession.create('/model.onnx');
    const feeds = { "input": x };
    const results = await session.run(feeds);
    const logits = results[13].data
    
    return logits
}

async function readCharacterEncodingFile() {
    const response = await fetch('/encodings/enc_nizami.txt');
    const data = await response.text();
    const lines = data;
    var characterDictionary = {};
    for (let i = 0; i < lines.length; i++) {
        const character = lines[i].trim();
        characterDictionary[i] = character;
    }
    characterDictionary[0] = "<br>";
    characterDictionary[1] = " ";

    return characterDictionary;
}

function softmax(logits) {
    var exp_logits = [];
    var sum_exp_logits = 0.0;
    var exp_logit = 0.0;
    for (const logit of logits) {
        exp_logit = Math.pow(Math.E, logit)
        exp_logits.push(exp_logit);
        sum_exp_logits += exp_logit;
    }

    var probs = [];
    for (let j = 0; j < logits.length; j++) {
        probs.push(exp_logits[j] / sum_exp_logits);
    }
    return probs
}

function multinomial(probs){
    // Cumulative sum of the probs
    var cum_sums = [];
    var cur_sum = 0.0;
    for (prob of probs) {
        cur_sum += prob;
        cum_sums.push(cur_sum);
    }

    const randomValue = Math.random();
    for (let j = 0; j < cum_sums.length; j++){
        if (cum_sums[j] > randomValue) {
            return j;
        }
    }
    return -1;
}

function generateText() {
    const inputElement = document.getElementById("inputText");
    const userInput = inputElement.value;
    const outputElement = document.getElementById("output");
    let generatedText = "";

    (async () => {
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
    })();
}

const inputElement = document.getElementById("inputText");
inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        generateText();
        event.preventDefault();
    }
});