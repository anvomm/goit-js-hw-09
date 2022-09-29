import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({ useIcon: false, })

const refs = {
  form: document.querySelector('.form'),
};

const formData = {};

refs.form.addEventListener('input', onInputDataSave);
refs.form.addEventListener('submit', onSubmitEvent);

function onInputDataSave(evt) {
  formData[evt.target.name] = evt.target.value;
};

function onSubmitEvent(evt) {
  evt.preventDefault();
  multiplePromiseCreate(formData);
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
};

function multiplePromiseCreate({delay, amount, step}) {
  let position = 1;
  let delayIncrease = Number(delay);
  for (let i = 1; i <= amount; i++) {
    createPromise(position, delayIncrease)
      .then(({ position,delayIncrease }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delayIncrease}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delayIncrease}ms`);
      });
    position += 1;
    delayIncrease += Number(step);
  };
}
