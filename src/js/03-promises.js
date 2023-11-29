import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      return Notiflix.Notify.success(
        `Fulfilled promise ${position} in ${delay} ms`
      );
    })
    .catch(({ position, delay }) => {
      return Notiflix.Notify.failure(
        `Rejected promise ${position} in ${delay} ms`
      );
    });
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const position = Number(event.currentTarget.amount.value);
  let delay = Number(event.currentTarget.delay.value);
  const step = Number(event.currentTarget.step.value);
  for (let i = 1; i <= position; i += 1) {
    createPromise(i, delay);
    delay += step;
  }
});
