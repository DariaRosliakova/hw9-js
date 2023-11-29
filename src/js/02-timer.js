import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const picker = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const refs = {
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};
button.disabled = true;
let time = null;
stopButton.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const parseSelectedDate = Date.parse(selectedDates[0]);
    const timeToSelectedDate =
      parseSelectedDate - Date.parse(options.defaultDate);
    if (timeToSelectedDate > 0) {
      button.disabled = false;
      let timer = timeToSelectedDate;
      convertMs(timer);
      button.addEventListener('click', () => {
        stopButton.disabled = false;
        button.disabled = true;
        time = setInterval(() => {
          timer -= 1000;
          convertMs(timer);
        }, 1000);
      });
      stopButton.addEventListener('click', () => {
        clearInterval(time);
        convertMs(0);
        stopButton.disabled = true;
        button.disabled = true;
      });
    } else {
      button.disabled = true;
      convertMs(0);
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(picker, options);
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  refs.dataDays.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMinutes.textContent = addLeadingZero(minutes);
  refs.dataSeconds.textContent = addLeadingZero(seconds);
  return { days, hours, minutes, seconds };
}
