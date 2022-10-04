import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const formRef = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'feedback-form-state';

initPage();

function onFormInput(event) {
  const { name, value } = event.target;

  let savedData = load(LOCALE_STORAGE_KEY);
  savedData = savedData ? savedData : {};
  savedData[name] = value;
  save(LOCALE_STORAGE_KEY, savedData);
}

formRef.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(event) {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;
  console.log({ email: email.value, message: message.value });

  event.currentTarget.reset();
  remove(LOCALE_STORAGE_KEY);
}

formRef.addEventListener('submit', onFormSubmit);

function initPage() {
  const savedData = load(LOCALE_STORAGE_KEY);

  if (!savedData) {
    return;
  }

  Object.entries(savedData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}
