const DATASETS = {
    NIZAMI: {
        encodingFile: '/encodings/enc_nizami.txt',
        modelFile: '/models/bigram_nizami.onnx',
    },
    SHAKESPEARE: {
        encodingFile: '/encodings/enc_tinyshakespeare.txt',
        modelFile: '/models/bigram_shakespeare.onnx',
    },
};

let currentDataset = DATASETS.SHAKESPEARE;

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

function switchDataset(dataset) {
    if (DATASETS[dataset]) {
        currentDataset = DATASETS[dataset];
        // You can also update the UI or perform any other necessary actions here
    } else {
        console.error('Invalid dataset:', dataset);
    }
}
