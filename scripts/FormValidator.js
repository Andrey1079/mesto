const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  errorClass: "popup__form-item-error_visible",
  inputErrorClass: ".popup__form-item-error",
};

class FormValidator {
  constructor(setObject, formElement) {
    this._formElement = formElement;
    this._formSelector = setObject.formSelector;
    this._inputSelector = setObject.inputSelector;
    this._submitButtonSelector = setObject.submitButtonSelector;
    this._inactiveButtonClass = setObject.inactiveButtonClass;
    this._errorClass = setObject.errorClass;
    this._inputErrorClass = setObject.inputErrorClass;
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListener();
  }
  _setEventListener() {
    const inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._toggleButtonState(inputs);
    inputs.forEach((input) => {
      this._checkInputValidity(this._formElement, input);
      addEventListener("input", () => {
        this._checkInputValidity(this._formElement, input);
        this._toggleButtonState(inputs);
      });
    });
  }
  _checkInputValidity(form, input) {
    const messageError = form.querySelector(`.${input.id}-error`);
    if (input.validity.valid) {
      this._hideInputError(messageError);
    } else {
      this._showInputError(messageError, input.validationMessage);
    }
  }
  _showInputError(messageError, message) {
    messageError.textContent = message;
    messageError.classList.add(this._errorClass);
  }
  _hideInputError(messageError) {
    messageError.classList.remove(this._errorClass);
  }
  _disableSubmitButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute("disabled", "disabled");
  }
  _enableSubmitButton(submitButton, inactiveButtonClass) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute("disabled", "disabled");
  }
  _toggleButtonState(inputs) {
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    if (this._hasInvalidInput(inputs)) {
      this._disableSubmitButton(submitButton, this._inactiveButtonClass);
    } else {
      this._enableSubmitButton(submitButton, this._inactiveButtonClass);
    }
  }
  _hasInvalidInput(inputs) {
    return inputs.some((input) => !input.validity.valid);
  }
}
export { FormValidator, settings };
