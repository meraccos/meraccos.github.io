document.getElementById('user_setting').addEventListener('change', function() {
    var agentSetting = document.getElementById('agent_setting');
    if (this.value === 'guider') {
      agentSetting.style.display = 'block';
    } else {
      agentSetting.style.display = 'none';
    }
  });


function startGame() {
    var numOfCharsBox = document.getElementById('num_of_chars_box');
    var numOfChars = numOfCharsBox.value;
    numOfChars = parseInt(numOfChars, 10);

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
}
