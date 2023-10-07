const DATASETS = {
    NIZAMI: {
        encodingFile: '/encodings/enc_nizami.txt',
    },
    SHAKESPEARE: {
        encodingFile: '/encodings/enc_tinyshakespeare.txt',
    },
};

const MODELS = {
    Bigram: {
        encodingFile: '/encodings/enc_nizami.txt',
        modelFile: {
            NIZAMI: '/models/bigram_nizami.onnx',
            SHAKESPEARE: '/models/bigram_shakespeare.onnx',
        },
    },
    LSTM: {
        encodingFile: '/encodings/enc_nizami.txt',
        modelFile: {
            NIZAMI: '/models/lstm_nizami.onnx',
            SHAKESPEARE: '/models/lstm_shakespeare.onnx',
        },
}};

let currentDataset = DATASETS.SHAKESPEARE;
let currentModel = 'bigram'

function selectModel(model, dataset) {
    currentDataset = DATASETS[dataset];
    currentModel = MODELS[model].modelFile[dataset]
}




function switchDataset(dataset) {
    const nizamiButton = document.querySelector('.nizami-button');
    const shakespeareButton = document.querySelector('.shakespeare-button');

    currentDataset = DATASETS[dataset];

    if (dataset === 'NIZAMI') {
        nizamiButton.disabled = true;
        shakespeareButton.disabled = false;
    } else {
        nizamiButton.disabled = false;
        shakespeareButton.disabled = true;
    }
}

function switchModel(model) {
    const bigramButton = document.getElementById('bigram-button');
    const lstmButton = document.getElementById('lstm-button');

    currentModel = model;

    if (model === 'bigram') {
        bigramButton.disabled = true;
        lstmButton.disabled = false;
    } else {
        bigramButton.disabled = false;
        lstmButton.disabled = true;
    }
}









async function readCharacterEncodingFile() {
    const response = await fetch(currentDataset.encodingFile);
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
