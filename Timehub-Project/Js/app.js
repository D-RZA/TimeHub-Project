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

pauseBtn.addEventListener("click", () => {

  if(!isRunning) return;

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

/*Timer */

const timerDisplay = document.getElementById("timerDisplay");

const timerMinutes = document.getElementById("timerMinutes");
const timerSeconds = document.getElementById("timerSeconds");

const timerStartBtn = document.getElementById("timeStartBtn");
const timerPauseBtn = document.getElementById("timerPauseBtn");
const timerResetBtn = document.getElementById("timerResetBtn");


let totalSeconds = 0;
let tmeerInterval = null;
let timerRunning = false;
let initialSeconds = 0;

timerStartBtn.addEventListener("click", () => {

  if (timeRunning) return;
  
  const minutes = Number(timerMinutes.value);
  const seconds = Number(timerSeconds.value);

  totalSeconds = (minutes * 60) + seconds;

  initialSeconds = totalSeconds;

  timerRunning = true;

  timerInterval = setInterval(() => {

    totalSeconds--;

    console.log(totalSeconds);

  },1000);

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
