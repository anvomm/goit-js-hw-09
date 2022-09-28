import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    timer: document.querySelector('.timer'),
    fields: document.querySelectorAll('.field'),
    values: document.querySelectorAll('.value'),
    labels: document.querySelectorAll('.label'),
};

refs.timer.style.display = 'flex';

refs.timer.style.gap = '20px';

refs.fields.forEach(field => {
    field.style.display = 'flex';
    field.style.flexDirection = 'column';
    field.style.alignItems = 'center';
});

refs.values.forEach(value => value.style.fontSize = '50px');

refs.labels.forEach(label => {
    label.style.fontSize = '15px';
    label.style.textTransform = 'uppercase';
    label.style.fontWeight = '600';
});

refs.startBtn.disabled = true;

let choosenDate = 0;
let timerId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (Date.now() - selectedDates[0] > 0) {
          Notify.failure('Please choose a date in the future!');
          return;
      };
      refs.startBtn.disabled = false;
      return choosenDate = selectedDates[0];
  },
};

flatpickr('input[type="text"]', options);

function onStartBtnClick() {
    refs.startBtn.disabled = true;
    timerId = setInterval(timer, 1000);
};

function timer() {
    const time = choosenDate - Date.now();
    if (time <= 0) {
        clearInterval(timerId);
        return;
    };
    const obj = convertMs(time);
    refs.values.forEach((value, i) => value.textContent = addLeadingZero(Object.values(obj)[i])); 
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
};