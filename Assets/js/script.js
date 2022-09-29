var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
 
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
 
function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
 
  // un-hide questions section
  questionsEl.removeAttribute("class");
 
  // start timer
  timerId = setInterval(clockTick, 1000);
 
  // show starting time
  timerEl.textContent = time;
 
  getQuestion();
}
 
function getQuestion() 
