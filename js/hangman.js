// document.getElementById('user_setting').addEventListener('change', function() {
//     var agentSetting = document.getElementById('agent_setting');
//     if (this.value === 'guider') {
//       agentSetting.style.display = 'block';
//     } else {
//       agentSetting.style.display = 'none';
//     }
//   });

var numOfChars = 7;
var lastGuess = '_';

var wordsArray = [];
var countsArray = [];
var matchingWords = [];
var matchingCounts = [];

var availableChars = [];

async function startGame() {
    var numOfCharsBox = document.getElementById('num_of_chars_box');
    numOfChars = numOfCharsBox.value;
    numOfChars = parseInt(numOfChars, 10);

    // if numOfChars is not a number, it is 7
    if (isNaN(numOfChars)) {
        numOfChars = 7;
    }

    // show all the letter_idx for idx=1 to numOfChars
    for (var i = 1; i <= numOfChars; i++) {
        var letterIdx = document.getElementById('letter' + i);
        letterIdx.style.display = 'inline';
        letterIdx.innerHTML = '_';
    }

    // hide all the letter_idx for idx=numOfChars+1 to 15
    for (var i = numOfChars + 1; i <= 15; i++) {
        var letterIdx = document.getElementById('letter' + i);
        letterIdx.style.display = 'none';
    }

    var wordsFileName = `/hangman/vocab/words_${numOfChars}.txt`;
    var countsFileName = `/hangman/vocab/counts_${numOfChars}.txt`;

    // initialize the words and counts array
    initVocab(wordsFileName, countsFileName);
    [wordsArray, countsArray] = await initVocab(wordsFileName, countsFileName);

    matchingWords = wordsArray;
    matchingCounts = countsArray;

    availableChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                          'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                          'u', 'v', 'w', 'x', 'y', 'z'];

    console.log(wordsArray);
}

function guessNext() {
    // get the current state and matching words
    var currentState = getCurrentState();
    var [matchingWords, matchingCounts] = getMatchingWords(currentState);
    
    console.log('Current state:', currentState);
    console.log('Matching words', matchingWords);

    // if there is only one word left, guess the next letter that is available
    if (matchingWords.length === 1) {
        var word = matchingWords[0];
        for (var i = 0; i < word.length; i++) {
            if (currentState[i] === '_') {
                var nextGuess = word[i];
                break;
            }
        }
    } else if (matchingWords.length === 0) {
        // return a random available letter
        var nextGuess = availableChars[Math.floor(Math.random() * availableChars.length)];
    } else {
        // calculate the entropy
        var sum_counts = matchingCounts.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
        entropy = -matchingCounts.reduce((acc, count) => {
            const prob = parseInt(count, 10) / sum_counts;
            return acc + prob * Math.log2(prob);
        }, 0);

        // log the entropy
        var entropyElement = document.getElementById('entropy');
        entropyElement.innerHTML = entropy.toFixed(2);

        // estimate the expected entropy from each available letter
        exp_entropies = [];
        for (var i = 0; i < availableChars.length; i++) {
            exp_entropies.push(probeChar(availableChars[i], matchingWords, matchingCounts));
        }
        // get the letter with the minimum expected entropy
        var min_entropy = Math.min(...exp_entropies);
        var min_entropy_idx = exp_entropies.indexOf(min_entropy);
        var nextGuess = availableChars[min_entropy_idx];
    }
    // log the guess
    var guess = document.getElementById('guess');
    guess.innerHTML = 'Guess: ' + nextGuess;
    lastGuess = nextGuess;

    // update the available characters
    availableChars.splice(min_entropy_idx, 1);
}

function probeChar(char, words, counts) {
    var positive_counts = []
    var negative_counts = []
    var positive_words = []
    var negative_words = []

    var sum_total = counts.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);


    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var count = counts[i];
        if (word.includes(char)) {
            positive_words.push(word);
            positive_counts.push(count);
        } else {
            negative_words.push(word);
            negative_counts.push(count);
        }
    }

    var sum_positives = positive_counts.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
    var sum_negatives = negative_counts.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);

    var prob_positive = sum_positives / sum_total;
    var prob_negative = sum_negatives / sum_total;

    var entropy_positive = 0.0;
    var entropy_negative = 0.0;

    if (positive_counts.length > 0) {
        entropy_positive = -positive_counts.reduce((acc, count) => {
            const prob = parseInt(count, 10) / sum_positives;
            return acc + prob * Math.log2(prob);
        }, 0);
    }

    if (negative_counts.length > 0) {
        entropy_negative = -negative_counts.reduce((acc, count) => {
            const prob = parseInt(count, 10) / sum_negatives;
            return acc + prob * Math.log2(prob);
        }, 0);
    }

    var exp_entropy = prob_positive * entropy_positive + prob_negative * entropy_negative;

    return exp_entropy;
}

function getMatchingWords(currentState) {
    let words = []
    let counts = []

    for (var i = 0; i < matchingWords.length; i++) {
        var word = matchingWords[i];
        var match = true;
        for (var j = 0; j < currentState.length; j++) {
            if (currentState[j] !== '_' && currentState[j] !== word[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            words.push(word);
            counts.push(matchingCounts[i]);
        }
    }
    return [words, counts];
}

function replaceLetter(idx) {
    var letterIdx = document.getElementById('letter' + idx);
    letterIdx.innerHTML = lastGuess;
}

function getCurrentState() {
    var currentState = [];
    for (var i = 1; i <= numOfChars; i++) {
        var letterIdx = document.getElementById('letter' + i);
        var letter = letterIdx.innerHTML;
        currentState.push(letter);
    }
    return currentState;
}

async function initVocab(wordsFileName, countsFileName) {
    try {
        const wordsResponse = await fetch(wordsFileName);
        const wordsData = await wordsResponse.text();
        wordsArray = wordsData.split('\n').map(word => word.trim()).filter(word => word.length > 0);

        const countsResponse = await fetch(countsFileName);
        const countsData = await countsResponse.text();
        countsArray = countsData.split('\n').map(word => word.trim()).filter(word => word.length > 0);

        return [wordsArray, countsArray];
    } catch (error) {
        console.error('Error fetching the data:', error);
        return null;
    }
}


function pickWord() {

    // The filename of the text file, words_{numofchars}.txt
    var wordsFileName = `/hangman/vocab/words_${numOfChars}.txt`;
    var countsFileName = `/hangman/vocab/counts_${numOfChars}.txt`;


    let selectedWord = '';
    let selectedCount = '';
    
    async function fetchData() {
        try {
            const wordsResponse = await fetch(wordsFileName);
            const wordsData = await wordsResponse.text();
            wordsArray = wordsData.split('\n').map(word => word.trim()).filter(word => word.length > 0);
            console.log(wordsArray); // Output the array of words to the console
    
            const countsResponse = await fetch(countsFileName);
            const countsData = await countsResponse.text();
            countsArray = countsData.split('\n').map(word => word.trim()).filter(word => word.length > 0);
            console.log(countsArray); // Output the array of words to the console
    
            // Convert countsArray to probs
            const countsSum = countsArray.reduce((a, b) => a + parseInt(b, 10), 0);
            const probs = countsArray.map(count => parseInt(count, 10) / countsSum);
            console.log(probs);
    
            // Sample a word and count from the probs distribution
            const cumulativeProbs = probs.reduce((acc, prob, index) => {
                if (index === 0) {
                    acc.push(prob);
                } else {
                    acc.push(acc[index - 1] + prob);
                }
                return acc;
            }, []);
    
            const randomValue = Math.random();
            const selectedIndex = cumulativeProbs.findIndex(cumProb => randomValue < cumProb);
    
            selectedWord = wordsArray[selectedIndex];
            selectedCount = countsArray[selectedIndex];
    
            console.log(`Selected word: ${selectedWord}, Selected count: ${selectedCount}`);
        } catch (error) {
            console.error('Error fetching the data:', error);
        }
    }
    
    fetchData();

}