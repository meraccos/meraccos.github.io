document.getElementById('user_setting').addEventListener('change', function() {
    var agentSetting = document.getElementById('agent_setting');
    if (this.value === 'guider') {
      agentSetting.style.display = 'block';
    } else {
      agentSetting.style.display = 'none';
    }
  });

var numOfChars = 7;
var lastGuess = '_';

var wordsArray = [];
var countsArray = [];
var matchingWords = [];
var matchingCounts = [];

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
    wordsArray, countsArray = await initVocab(wordsFileName, countsFileName);
    console.log(wordsArray);
}

function guessNext() {
    var currentState = getCurrentState();
    matchingWords, matchingCounts = getMatchingWords(currentState);
    console.log(matchingWords);

    //~~~~~~~~~~~~~



    var placeholder = "r";
    //~~~~~~~~~~~~~

    // replace the text with id "guess" with the placeholder
    var guess = document.getElementById('guess');
    guess.innerHTML = 'Guess: ' + placeholder;
    lastGuess = placeholder;
}

function getMatchingWords(currentState) {
    console.log('Current state:', currentState);
    
    var matchingWords = [];
    var matchingCounts = [];

    for (var i = 0; i < wordsArray.length; i++) {
        var word = wordsArray[i];
        var match = true;
        for (var j = 0; j < currentState.length; j++) {
            if (currentState[j] !== '_' && currentState[j] !== word[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            matchingWords.push(word);
            matchingCounts.push(countsArray[i]);
        }
    }
    return [matchingWords, matchingCounts];
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