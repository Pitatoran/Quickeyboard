const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var RESULT = document.getElementById("resultTime");
var COUNT = document.getElementById("wordCount");
var WPM = document.getElementById("WPM");

var timer = [0,0,0,0]; //Use for Timer
var interval; //Use for Timer
var timerRunning = false; //Use to complete finish the game

// Adds the "zero" from 0 - 9;
function leadingZero(time) {
  if(time <= 9) {
    time = "0" + time;
  }

  return time;
}

// Timer: "hr : min : sec";
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Text checker;
function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);

  var counter = 0;
  for(var i = 0; i < textEntered.length; i++) {
    if(originText[i] == " ") {
      counter ++;
    }
  }
  counter++;

  if(textEntered == originText) {
    clearInterval(interval);
    testWrapper.style.borderColor = "#00c15e";

    RESULT.innerHTML = leadingZero(timer[0]) + " min " + leadingZero(timer[1]) + " sec " + leadingZero(timer[2]) + " ms";
    COUNT.innerHTML = counter;
    var total = ((timer[0]) * 60) + timer[1];
    WPM.innerHTML = (counter / total) * 60 ;
  } else {
    if(textEntered == originText) {
      testWrapper.style.borderColor = "#00c15e";
    } else {
      testWrapper.style.borderColor = "#f10032";
    }
  }

  console.log(textEntered);
}

// Start timer;
function start() {
  let textEnteredLength = testArea.value.length;
  console.log(textEnteredLength);

  if(textEnteredLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

// Reset everything;
function reset() {
  clearInterval(interval);
  interval = null;
  timer[0,0,0,0];
  timerRunning = false;

  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";

  RESULT.innerHTML = " ";
  COUNT.innerHTML = " ";
  WPM.innerHTML = " ";
}

// Event listeners
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
