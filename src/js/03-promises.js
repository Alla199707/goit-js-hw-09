import { Notify } from 'notiflix/build/notiflix-notify-aio';
const promiseForm = document.querySelector('.form');
promiseForm.addEventListener('submit', callPromice);
document.querySelector('body').style.backgroundColor = '#f7eff5';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// const onResolve = ({ position, delay }) => {
//   //Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
// };

// const onRejected = ({ position, delay }) => {
//  // Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
// };

function callPromice(evt) {
  evt.preventDefault();
  let { delay, step, amount } = Object.fromEntries(
    new FormData(evt.currentTarget)
  );

  if (!amount || !step || !delay) {
    Notify.failure(`❌ Заповніть поля`);
    //console.log(`❌ Заповніть поля`);
    return;
  }
  amount = Number(amount);
  step = Number(step);
  delay = Number(delay);
  // let promiseDelay = 0;
  for (let i = 0; i < amount; i++) {
    let promiseDelay = delay + step * i;
    createPromise(i + 1, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
