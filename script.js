//timer section
var timeEl = document.querySelector(".time");
var secondsLeft = 11; //75;
var buttonEl = document.getElementById("button");

function setTime() {
  var timerInterval = setInterval(function (e) {
    secondsLeft = secondsLeft - 1;
    console.log(secondsLeft);
    timeEl.textContent = "Timer:" + secondsLeft;
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timeEl.textContent = "All done!";
      //sendMessage();
    }
  }, 1000);
}

function sendMessage() {
  var divLastEl = document.createElement("div");
  divLastEl.textContent = "All done!";
}

buttonEl.addEventListener("click", setTime);

//view high scores section
var scoresEl = document.getElementById("scores");
var highScoresEl = document.getElementById(".highscores");
highScoresEl.textContent = "High Scores";

var input = document.createElement("input");

/* Code Quiz -Pseudo code

—When start button is clicked, timer starts and a question is presented.
—Once answer it, - correctly or incorrectly - another one is presented
—if answered incorrectly, time is subtracted from clock.
—game is over , when either all questions are answered or timer is zero
—save the initials and score , when the game is over.
—it should store the high score if you play multiple times. - so that sort of information will need to be persistent.

—When either view high scores button is clicked ,it shud display the high scores page with the score board and also with Go back and clear high scores buttons.
—the scores with initials should listed in a ordered list and display above the buttons(go back and clear high scores)
—when clear high scores button is clicked, the score board shud be cleared.
—when Go back is clicked, it should return to the home page of the code quiz.
—when a question is answered, the result (correct or wrong) shud be displayed along with the next question presented but below it and line .
—after the game is over, All done page should be played with final score and enter initial text input box and submit button.
—once initial are submitted, it shud display the high scores with the list of score and 2 buttons.(view high scores page)
—questions related to javascript coding.
—hide the information and display as per the requirement or as clicked




- final score will be the time left.

time===75 seconds
Question 5
Wrong answer deduct=10sec */
