function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
console.log(body.style.backgroundColor);
startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);
let background = null;
function onStartBtn() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  body.style.backgroundColor = getRandomHexColor();
  background = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStopBtn() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(background);
}
