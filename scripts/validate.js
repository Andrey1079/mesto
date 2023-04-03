// объект с классами
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  errorClass: "popup__form-item-error_visible",
  inputErrorClass: ".popup__form-item-error",
};
// находим формы и отменяем действия по умолчанию
function enableValidation({ formSelector, ...set }) {
  Array.from(document.querySelectorAll(formSelector)).forEach((form) => {
    form.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListener(form, set);
  });
}
enableValidation(settings);
// слушатели полей на ввод + проверка валидности формы
function setEventListener(form, { inputSelector, ...set }) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  toggleButtonState(form, inputs, set);
  inputs.forEach((input) => {
    addEventListener("input", () => {
      checkInputValidity(form, input, set);
      toggleButtonState(form, inputs, set);
    });
  });
}
// слушает инпуты
function checkInputValidity(form, input, { errorClass }) {
  const messageError = form.querySelector(`.${input.id}-error`);
  if (input.validity.valid) {
    hideInputError(messageError, errorClass);
  } else {
    showInputError(messageError, input.validationMessage, errorClass);
  }
}
// показывает сообщение об ошибке
function showInputError(messageError, message, errorClass) {
  messageError.textContent = message;
  messageError.classList.add(errorClass);
}
// скрывает сообщение об ошибке
function hideInputError(messageError, errorClass) {
  messageError.classList.remove(errorClass);
}
// состояние кнопки submit
function toggleButtonState(form, inputs, { submitButtonSelector, ...set }) {
  const submitButton = form.querySelector(submitButtonSelector);
  if (hasInvalidInput(inputs)) {
    disableSubmitButton(submitButton, set);
  } else {
    enableSubmitButton(submitButton, set);
  }
}
// проверка валидности формы
function hasInvalidInput(inputs) {
  return inputs.some((input) => !input.validity.valid);
}
// деактивация submit
function disableSubmitButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.setAttribute("disabled", "disabled");
}
// активация submit
function enableSubmitButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.removeAttribute("disabled", "disabled");
}
