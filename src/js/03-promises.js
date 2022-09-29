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
  let position = 1;
  let delay = Number(formData.delay);
  for (let i = 1; i <= formData.amount; i++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    position += 1;
    delay += Number(formData.step);
  };
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

