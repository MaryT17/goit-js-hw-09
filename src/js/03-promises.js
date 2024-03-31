import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = { position, delay };
      const shouldResolve = Math.random() > 0.3;

      shouldResolve ? resolve(result) : reject(result);
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const firstDelay = +formData.get('delay');
  const delayStep = +formData.get('step');
  const amount = +formData.get('amount');

  for (let i = 0; i < amount; i++) {
    let currentDelay = firstDelay + i * delayStep;

    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

Notify.init({
  useIcon: false,
});
