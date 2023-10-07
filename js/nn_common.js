const MODEL = {
    encodingFile: undefined,
    modelFile: undefined,
};

function getModel(model, dataset) {
    if (dataset == 'nizami') {
        MODEL.encodingFile =  '/encodings/enc_nizami.txt';
        if (model == 'bigram') {
            MODEL.modelFile = '/models/bigram_nizami.onnx'
        } else {
            MODEL.modelFile = '/models/lstm_nizami.onnx'
        }
    } else if (dataset == 'shakespeare') {
        MODEL.encodingFile =  '/encodings/enc_tinyshakespeare.txt';
        if (model == 'bigram') {
            MODEL.modelFile = '/models/bigram_shakespeare.onnx'
        } else {
            MODEL.modelFile = '/models/lstm_shakespeare.onnx'     // FIX THIS
        }
    }
}

function switchDataset(dataset) {
    const nizamiButton = document.querySelector('.nizami-button');
    const shakespeareButton = document.querySelector('.shakespeare-button');
    nizamiButton.disabled = (dataset === 'nizami');
    shakespeareButton.disabled = !nizamiButton.disabled;
    selectedDataset = dataset;
    getModel(selectedModel, selectedDataset)
}

function switchModel(model) {
    const bigramButton = document.getElementById('bigram-button');
    const lstmButton = document.getElementById('lstm-button');
    bigramButton.disabled = (model === 'bigram');
    lstmButton.disabled = !bigramButton.disabled;
    selectedModel = model;
    getModel(selectedModel, selectedDataset)
}

async function readCharacterEncodingFile() {
    const response = await fetch(MODEL.encodingFile);
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
    const exp_logits = logits.map(logit => Math.exp(logit));
    const sum_exp_logits = exp_logits.reduce((sum, exp_logit) => sum + exp_logit, 0.0);
    var probs = logits.map((logit) => Math.exp(logit) / sum_exp_logits);
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
    const sampled_idx = cum_sums.findIndex((cum_sum) => cum_sum > randomValue);
    return sampled_idx;
}

function zeroTensor(n_zeros) {
    data = [];
    for (let j = 0; j < n_zeros; j++) {
        data.push(0);
    };

    array = Float32Array.from(data);
    tensor = new ort.Tensor("float32", array, [1, n_zeros]);
    return tensor;
}

function generateText() {
    const button = document.getElementById('generate_button');
    const inputElement = document.getElementById("inputText");
    const userInput = inputElement.value;
    if (selectedModel === 'lstm') {
        generateLSTMText(userInput);
    } else if (selectedModel === 'bigram') {
        generateBigramText(userInput);
    }
}
