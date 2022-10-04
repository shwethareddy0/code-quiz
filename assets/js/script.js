//timer section
var timeEl = document.querySelector(".time");
var secondsLeft = 75;
var buttonEl = document.getElementById("button");
var timerInterval;
timeEl.textContent = "Time:" + secondsLeft;

//function for setting the timer.
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
    }
  }, 1000);
}
//creating div element with All done message.
function sendMessage() {
  var divLastEl = document.createElement("div");
  divLastEl.textContent = "All done!";
}
//Button addeventlistener event for timer.
buttonEl.addEventListener("click", setTime);

//variables for header , main and view highscores elements
var headerEl = document.querySelector(".header");
var mainEl = document.querySelector(".main");
var highScoresEl = document.getElementById("high-scores-page");

//view view high scores section
function viewHighScores() {
  headerEl.style.visibility = "hidden";
  mainEl.style.display = "none";
  highScoresEl.style.display = "initial";
  scoresSubmitEl.style.display = "none";
  readScoresFromLocalStorage();
}

//function for local storage, creating elemet Div and appending it.
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
//function for go back button
function goBack() {
  headerEl.style.visibility = "visible";
  mainEl.style.display = "flex";
  highScoresEl.style.display = "none";
  scoresSubmitEl.style.display = "none";
}
//function for clear high scores button
function clearHighScores() {
  localStorage.clear();
  readScoresFromLocalStorage();
}

//Question and Answers list for the code Quiz
//this array has objects for questions, options and results.
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
//variables for questions,options and question answersection elements
var questionEl = document.querySelector(".question");
var optionsElList = document.querySelectorAll(".options");
var questionAnswerSectionEl = document.querySelector(".questions-answers");

//function for executing the code quiz
function startQuiz() {
  questionAnswerSectionEl.style.display = "flex";
  mainEl.style.display = "none";
  highScoresEl.style.display = "none";
  scoresSubmitEl.style.display = "none";
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

//Validating the result and displaying the next question with options.
function validateAndNextDisplayQuestion(clickedOption) {
  if (questionAnswerList.length === 0) {
    gameOver();
    return;
  }
  resultEl.style.display = "flex";
  if (clickedOption.getAttribute("data-correct") == "true") {
    showResultEl.textContent = "Correct!";
  } else {
    //Deducting 10 seconds from the timer for wrong answer.
    secondsLeft = secondsLeft - 10;
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

//game over and enter iintials and submit form
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
