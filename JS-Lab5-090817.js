// VARIABLES
var sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
var sentenceIndex = 0;
var letterIndex = 0;
var errorCount = 0;
var startTime;

var currentSentence = sentences[0];
var currentLetter = currentSentence.charAt(0);
// equivalent but better than currentSentence[0];

//hide keyboard
document.addEventListener("DOMContentLoaded" , function(){
   $("#keyboard-upper-container").hide();

//toggle keyboards
   $(document).keydown(function(shift){
    if(shift.which === 16)//Enter key pressed
        //Trigger search button click event
        $("#keyboard-lower-container").hide();
        $("#keyboard-upper-container").show();
    })
    $(document).keyup(function(shift){
        if(shift.which === 16)//Enter key pressed
            //Trigger search button click event
            $("#keyboard-upper-container").hide();
            $("#keyboard-lower-container").show();
        });
    // $(document).keypress(function(a){
    //     if(a.which===65)
    //     $('#sentence').text(currentSentence);
    //     $('#target-letter').text(currentLetter);
    // });
        $('#sentence').text(currentSentence);
        $('#target-letter').text(currentLetter);

});
//HIGHLIGHTS

$(document).keypress(function (event) {
    event.preventDefault(); //keeps scroll from happening
    $('#' + event.which).addClass('highlighted');
    // use variable pound sign #
    // no . for highlighted, . is selector
    // use console.log(event); to locate, determine time stamp
    if (!startTime) {
        startTime = event.timeStamp;
    // once restart game, this will not restart, set undefined for reset
    }
    // truthiness, ! makes startTime false, which makes if statement read from code block { }

    // string will always be 0; 0 will always be string
    else if (event.which === currentLetter.charCodeAt(0)) {
        $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');
    } else {
        $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
        errorCount++;
    }

    letterIndex++;

// If we are at the end of the current sentence
    if (letterIndex === currentSentence.length) {
        // move on to next sentence
        sentenceIndex++;
// If we are out of sentences
        if (sentenceIndex === sentences.length) { // end of game
            var endTime = event.timeStamp; // need start, end time to calculate formula
            var elapsedMinutes = (endTime - startTime) / (60* 1000)
            // 1000 will take us to seconds
            var wpm = 54 / elapsedMinutes - 2 * errorCount; // parentheses unnecessary b/c order of operations
            $('#feedback').text('You scored ' + wpm + ' words per minute.');
            setTimeout(function() {
                if (confirm('Would you like to play again?')) {
                    // reset variables if they want to play again
                    sentenceIndex = 0;
                    letterIndex = 0;
                    currentSentence = sentences[0];
                    currentLetter - currentSentence.charAt(0);
                    $('#sentence').text(currentSentence);
                    $('#target-letter').text(currentLetter);
                    $('#feedback').empty();
                    $('#yellow-block').css('left', '15px');
                    startTime = undefined;
                }
            }, 2000);
            // setTime tells function to run for x seconds
        } else {
// there is at least one more sentence
// move on to the next sentence
            currentSentence = sentences[sentenceIndex];
            $('#sentence').text(currentSentence);
// reset the letter back to the first position
        letterIndex = 0;
        currentLetter = currentSentence.charAt(letterIndex);
        $('#target-letter').text(currentLetter);
        $('#feedback').empty();
        $('#yellow-block').css('left', '15px');
        }
    } else {
// not at the end of the sentence, move onto the next letter
// block will be place when typing & moving on to next letter
    currentLetter = currentSentence.charAt(letterIndex);
    $('#target-letter').text(currentLetter);
// += means increment, like an i++ // doesn't clear for next sentence
    $('#yellow-block').css('left', '+=17.5');
    }
});