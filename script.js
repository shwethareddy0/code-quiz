//timer section
var timeEl = document.querySelector(".time");
var secondsLeft = 30; //75;
var buttonEl = document.getElementById("button");
var timerInterval;
timeEl.textContent = "Time:" + secondsLeft;

function setTime() {
  timerInterval = setInterval(function (e) {
    secondsLeft = secondsLeft - 1;
    if (secondsLeft <= 0) {
      secondsLeft = 0;
      timeEl.textContent = "Time:" + secondsLeft;
      gameOver();
      return;
    }
    console.log(secondsLeft);
    timeEl.textContent = "Time:" + secondsLeft;
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      //timeEl.textContent = "All done!";
      //sendMessage();
    }
  }, 1000);
}

function sendMessage() {
  var divLastEl = document.createElement("div");
  divLastEl.textContent = "All done!";
}

buttonEl.addEventListener("click", setTime);

var headerEl = document.querySelector(".header");
var mainEl = document.querySelector(".main");
var highScoresEl = document.getElementById("high-scores-page");

//view view high scores section
function viewHighScores() {
  headerEl.style.visibility = "hidden";
  mainEl.style.display = "none";
  highScoresEl.style.display = "initial";
  readScoresFromLocalStorage();
}
function readScoresFromLocalStorage() {
  var quizFinalScores = JSON.parse(localStorage.getItem("quiz-final-scores"));
  var scoreListEl = document.querySelector(".scorelist");
  scoreListEl.innerHTML = "";
  if (quizFinalScores === null) {
    return;
  } else {
    for (var i = 0; i < quizFinalScores.length; i++) {
      var scoreDiv = document.createElement("div");
      scoreDiv.textContent = quizFinalScores[i];
      scoreListEl.appendChild(scoreDiv);
    }
  }
}
function goBack() {
  headerEl.style.visibility = "visible";
  mainEl.style.display = "flex";
  highScoresEl.style.display = "none";
  scoresSubmitEl.style.display="none";
  
function clearHighScores() {
  localStorage.clear();
  readScoresFromLocalStorage();
}

//Question and Answers for the code Quiz

var questionAnswerList = [
  {
    question: "Which of the following is not javascript data types?",
    options: [
      "1. Null type",
      "2. Undefined type",
      "3. Number type",
      "4. All of the mentioned",
    ],
    result: 3,
  },
  {
    question:
      "Which of the following function of String object returns the calling string value converted to lower case?",
    options: [
      "1. toLocaleLowerCase()",
      "2. toLowerCase()",
      "3. toString()",
      "4. substring()",
    ],
    result: 1,
  },
  {
    question:
      "Which of the following function of Number object returns the number's value?",
    options: [
      "1. toString()",
      "2. valueOf()",
      "3. toLocaleString()",
      "4. toPrecision()",
    ],
    result: 1,
  },
  {
    question:
      "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
    options: ["1. Position", "2. Window", "3. Standard", "4. Location"],
    result: 1,
  },
  {
    question:
      "Which of the following function of Array object returns a new array comprised of this array joined with other array(s) and/or value(s)?",
    options: ["1. concat()", "2. pop()", "3. push()", "4. some()"],
    result: 0,
  },
];

var questionEl = document.querySelector(".question");
var optionsElList = document.querySelectorAll(".options");
var questionAnswerSectionEl = document.querySelector(".questions-answers");

function startQuiz() {
  questionAnswerSectionEl.style.display = "flex";
  mainEl.style.display = "none";
  highScoresEl.style.display = "none";
  var randomIndex = Math.floor(Math.random() * questionAnswerList.length);
  var randomQuestionObj = questionAnswerList[randomIndex];
  questionAnswerList.splice(randomIndex, 1);
  questionEl.textContent = randomQuestionObj.question;
  for (i = 0; i < optionsElList.length; i++) {
    optionsElList[i].style.display = "initial";
    if (i === randomQuestionObj.result) {
      optionsElList[i].setAttribute("data-correct", true);
    } else {
      optionsElList[i].setAttribute("data-correct", false);
    }
    optionsElList[i].textContent = randomQuestionObj.options[i];
  }
}
//refers to the result container
var resultEl = document.querySelector(".result-container");
var showResultEl = document.querySelector(".result");

/*Validating the result and displaying the next question with options*/

function validateAndNextDisplayQuestion(clickedOption) {
  if (questionAnswerList.length === 0) {
    gameOver();
    return;
  }
  resultEl.style.display = "flex";
  if (clickedOption.getAttribute("data-correct") == "true") {
    showResultEl.textContent = "Correct!";
  } else {
    secondsLeft = secondsLeft - 5;
    showResultEl.textContent = "Wrong!";
  }

  var randomIndex = Math.floor(Math.random() * questionAnswerList.length);
  var randomQuestionObj = questionAnswerList[randomIndex];
  questionAnswerList.splice(randomIndex, 1);
  questionEl.textContent = randomQuestionObj.question;
  for (i = 0; i < optionsElList.length; i++) {
    optionsElList[i].textContent = randomQuestionObj.options[i];
    if (i === randomQuestionObj.result) {
      optionsElList[i].setAttribute("data-correct", true);
    } else {
      optionsElList[i].setAttribute("data-correct", false);
    }
  }
}
var scoresSubmitEl = document.querySelector(".scores-submit");
var finalScoresEl = document.querySelector(".final-score");

/*game over and enter iintials and submit*/
function gameOver() {
  questionAnswerSectionEl.style.display = "none";
  headerEl.style.visibility = "visible";
  scoresSubmitEl.style.display = "flex";
  finalScoresEl.textContent = secondsLeft;
  clearInterval(timerInterval);
}

//submit button for final score
var initialsTextBoxEl = document.querySelector(".initials-text-box");
function submitInitials(event) {
  event.preventDefault();
  var initialsValue = initialsTextBoxEl.value;

  //read the data localstorage
  var quizFinalScores = JSON.parse(localStorage.getItem("quiz-final-scores"));
  if (quizFinalScores == null) {
    quizFinalScores = ["1. " + initialsValue + " - " + secondsLeft];
    localStorage.setItem("quiz-final-scores", JSON.stringify(quizFinalScores));
  } else {
    quizFinalScores.push(
      quizFinalScores.length + 1 + ". " + initialsValue + " - " + secondsLeft
    );
    localStorage.setItem("quiz-final-scores", JSON.stringify(quizFinalScores));
  }
  // hide submit form
  // show high scores section
  scoresSubmitEl.style.display = "none";
  viewHighScores();
}

/* 

Code Quiz -Pseudo code

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
