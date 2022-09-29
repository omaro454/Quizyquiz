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
 // get current question object from array
 var currentQuestion = questions[currentQuestionIndex];
 
 var titleEl = document.getElementById("question-title");
 titleEl.textContent = currentQuestion.title;

 choicesEl.innerHTML = "";

 currentQuestion.choices.forEach(function(choice, i) {

   var choiceNode = document.createElement("button");
   choiceNode.setAttribute("class", "choice");
   choiceNode.setAttribute("value", choice);

   choiceNode.textContent = i + 1 + ". " + choice;

   choiceNode.onclick = questionClick;

   choicesEl.appendChild(choiceNode);
 });

function questionClick() {
 if (this.value !== questions[currentQuestionIndex].answer) {
  
   time -= 15;

   if (time < 0) {
     time = 0;
   }
   timerEl.textContent = time;
   feedbackEl.textContent = "Wrong!";
   feedbackEl.style.color = "red";
   feedbackEl.style.fontSize = "400%";
 } else {
   feedbackEl.textContent = "Correct!";
   feedbackEl.style.color = "green";
   feedbackEl.style.fontSize = "400%";
 }
 feedbackEl.setAttribute("class", "feedback");
 setTimeout(function() {
   feedbackEl.setAttribute("class", "feedback hide");
 }, 1000);

 currentQuestionIndex++;

 // time checker
 if (currentQuestionIndex === questions.length) {
   quizEnd();
 } else {
   getQuestion();
 }
}

function quizEnd() {
 // stop timer
 clearInterval(timerId);

 // show end screen
 var endScreenEl = document.getElementById("end-screen");
 endScreenEl.removeAttribute("class");

 // show final score
 var finalScoreEl = document.getElementById("final-score");
 finalScoreEl.textContent = time;

 questionsEl.setAttribute("class", "hide");
}

function clockTick() {
 // update time
 time--;
 timerEl.textContent = time;

 if (time <= 0) {
   quizEnd();
 }
}

function saveHighscore() {
 var initials = initialsEl.value.trim();

 if (initials !== "") {
   var highscores =
     JSON.parse(window.localStorage.getItem("highscores")) || [];
   var newScore = {
     score: time,
     initials: initials
   };

   // save to localstorage
   highscores.push(newScore);
   window.localStorage.setItem("highscores", JSON.stringify(highscores));
   window.location.href = "score.html";
 }
}

function checkForEnter(event) {
 if (event.key === "Enter") {
   saveHighscore();
 }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
