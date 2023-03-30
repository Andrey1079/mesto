const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  errorClass: "popup__form-item-error_visible",
};

function enableValidation({ formSelector, ...set }) {
  Array.from(document.querySelectorAll(formSelector)).forEach((form) => {
    form.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListener(form, set);
  });
}

function setEventListener(
  form,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...set }
) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  toggleButtonState(form, inputs, submitButtonSelector, inactiveButtonClass);
  inputs.forEach((input) => {
    checkInputValidity(form, input, set);
    addEventListener("input", () => {
      checkInputValidity(form, input, set);
      toggleButtonState(
        form,
        inputs,
        submitButtonSelector,
        inactiveButtonClass
      );
    });
  });
}

function checkInputValidity(form, input, { errorClass }) {
  const messageError = form.querySelector(`.${input.id}-error`);
  console.log("hi");
  if (input.validity.valid) {
    hideInputError(messageError, errorClass);
  } else {
    showInputError(messageError, input.validationMessage, errorClass);
  }
}
function showInputError(messageError, message, errorClass) {
  messageError.textContent = message;
  messageError.classList.add(errorClass);
}
function hideInputError(messageError, errorClass) {
  messageError.classList.remove(errorClass);
}

function toggleButtonState(
  form,
  inputs,
  submitButtonSelector,
  inactiveButtonClass
) {
  const submitButton = form.querySelector(submitButtonSelector);
  if (hasInvalidInput(inputs)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute("disabled", "disabled");
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute("disabled", "disabled");
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((input) => !input.validity.valid);
}
