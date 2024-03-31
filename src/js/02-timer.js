import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notify.failure('Pleae choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};
let intervalId;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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

  return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', () => {
  const endDate = new Date(datetimePicker.value);
  datetimePicker.disabled = true;
  startButton.disabled = true;

  const updateTimer = () => {
    const currentTime = new Date();
    const timeLeft = endDate - currentTime;

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      Notify.success('The countdown has finished!');
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);

      daysSpan.textContent = addLeadingZero(days);
      hoursSpan.textContent = addLeadingZero(hours);
      minutesSpan.textContent = addLeadingZero(minutes);
      secondsSpan.textContent = addLeadingZero(seconds);
    }
  };

  updateTimer();
  intervalId = setInterval(updateTimer, 1000);
});

flatpickr('#datetime-picker', options);
startButton.disabled = true;
