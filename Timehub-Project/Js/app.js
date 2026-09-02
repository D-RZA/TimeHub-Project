const clock = document.getElementById("clock");
const ampmEl = document.getElementById("ampm");
const dateEl = document.getElementById("date");
const local = document.getElementById("local");

function updateClock() {

  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  let locals = now.getTimezoneOffset();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  hours = hours.toString().padStart(2, "0");

  clock.textContent = `${hours}:${minutes}:${seconds}`;
  ampmEl.textContent = ampm;

  // We'll improve this later in the World Clock section
  locals = locals / 60;
  locals = locals <= 0 ? "+" : "";
  local.textContent = `UTC${locals}`;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  dateEl.textContent = now.toLocaleDateString(undefined, options);

}

updateClock();
setInterval(updateClock, 1000);


// ================================
// Page Navigation
// ================================

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-btn");

function showPage(pageId) {

  // Hide every page
  pages.forEach((page) => {
    page.classList.add("hidden");
  });

  // Find the selected page
  const selectedPage = document.getElementById(pageId);

  // Show it
  selectedPage.classList.remove("hidden");
}

function setActiveButton(button) {

  // Remove active class from every button
  navButtons.forEach((btn) => {
    btn.classList.remove("bg-primary");
  });

  // Activate the clicked button
  button.classList.add("bg-primary");
};

// Add click event to every navigation button

navButtons.forEach((button) => {

  button.addEventListener("click", () => {

    setActiveButton(button);

    const pageId = button.dataset.page;

    showPage(pageId);

  });

});

// App Initialization
// ================================

// Show the Clock page when the app starts

showPage("stopwatchSection");

const defaultButton = document.querySelector('[data-page="stopwatchSection"]'
);

setActiveButton(defaultButton);

//stopwatch

const stopwatchDisplay = document.getElementById("stopwatchDisplay");

let startTime = 0;
let elapsedTime = 0;
let timer = null;
let isRunning = false;

const startBtn = document.getElementById("startBtn");

const pauseBtn = document.getElementById("pauseBtn");

const resetBtn = document.getElementById("resetBtn");

// Start the stopwatch when the user clicks the "Start" button
startBtn.addEventListener("click", () => {

  if (isRunning) return;

  startTime = Date.now() - elapsedTime;

  isRunning = true;

  timer = setInterval(() => {

    elapsedTime = Date.now() - startTime;

    const milliseconds = elapsedTime % 1000;
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    const hours = Math.floor(minutes / 60);
    const displayMinutes = minutes % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = displayMinutes.toString().padStart(2, "0");
    const formattedSeconds = displaySeconds.toString().padStart(2, "0");
    const formattedMilliseconds = milliseconds.toString().padStart(3, "0");

    stopwatchDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;

  }, 10);

});

// Pause the stopwatch when the user clicks the "Pause" button

pauseBtn.addEventListener("click", () => {

  if (!isRunning) return;

  clearInterval(timer);
  timer = null;
  isRunning = false;

});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  timer = null;
  elapsedTime = 0;
  stopwatchDisplay.textContent = "00:00:00.000";
});

//timer

const timerDisplay = document.getElementById("timerDisplay");

const timerHours = document.getElementById("timerHours");
const timerMinutes = document.getElementById("timerMinutes");
const timerSeconds = document.getElementById("timerSeconds");

const timerStartBtn = document.getElementById("timerStartBtn");
const timerPauseBtn = document.getElementById("timerPauseBtn");
const timerResetBtn = document.getElementById("timerResetBtn");


let totalSeconds = 0;
let timerInterval = null;
let timerRunning = false;
let timerStarted = false;
let initialSeconds = 0;

// Start the timer when the user clicks the "Start" button

timerStartBtn.addEventListener("click", () => {

  if (timerRunning) return;

  if (!timerStarted) {

    const hours = Number(timerHours.value);
    const minutes = Number(timerMinutes.value);
    const seconds = Number(timerSeconds.value);


    totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    initialSeconds = totalSeconds;

    timerStarted = true;

  }

  updateTimerDisplay();

  timerRunning = true;

  timerInterval = setInterval(() => {

    if (totalSeconds <= 0) {
      totalSeconds = 0;

      updateTimerDisplay();

      clearInterval(timerInterval);
      timerInterval = null;
      timerRunning = false;

      alert("Time's up!");

      return;
    }

    totalSeconds--;

    updateTimerDisplay();

  }, 1000);

});

// Pause the timer when the user clicks the "Pause" button

timerPauseBtn.addEventListener("click", () => {

  if (!timerRunning) return;

  clearInterval(timerInterval);
  timerInterval = null;

  timerRunning = false;

});

// Update the timer display based on totalSeconds

function updateTimerDisplay() {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  timerDisplay.textContent =
    `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
// Reset the timer when the user clicks the "Reset" button

timerResetBtn.addEventListener("click", () => {

  clearInterval(timerInterval);
  timerInterval = null;

  timerRunning = false;
  timerStarted = false;

  totalSeconds = 0;

  updateTimerDisplay();

});


//alarm

const alarmTime = document.getElementById("alarmTime");
const setAlarmBtn = document.getElementById("setAlarmBtn");
const clearAlarmBtn = document.getElementById("clearAlarmBtn");
const alarmStatus = document.getElementById("alarmStatus");
const alarmSound = new Audio("sounds/Eyedress.mp3");

let alarmTimeValue = null;
let alarmTriggered = false;

// Set the alarm when the user clicks the "Set Alarm" button

setAlarmBtn.addEventListener("click", () => {

  if (alarmTime.value === "") {
    alarmStatus.textContent = "Please select a valid time for the alarm.";
    return;
  }

  alarmTimeValue = alarmTime.value;
  alarmTriggered = false;

  alarmStatus.textContent = `Alarm set for ${alarmTimeValue}`;

});

// Check the alarm every second

setInterval(() => {

  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();

  const currentTime =
    `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  if (currentTime === alarmTimeValue && !alarmTriggered) {

    alarmSound.play();

    alarmTriggered = true;
  }

}, 1000);

clearAlarmBtn.addEventListener("click", () => {
  alarmTimeValue = null;
  alarmTriggered = false;

  alarmStatus.textContent = "No alarm set";

  alarmTime.value = "";
});

const stopAlarmBtn = document.getElementById("stopAlarmBtn");

stopAlarmBtn.addEventListener("click", () => {
  alarmSound.pause();
  alarmSound.currentTime = 0;

  alarmTriggered = true;

  alarmStatus.textContent = "Alarm Stopped";

});












/*

function showPosition(position){
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  return `You are at: ${lat}, ${lon}`;
}

function showError(error) {
  return "Could not get location:", error.message;
}

navigator.geolocation.getCurrentPosition(showPosition,showError);

*/