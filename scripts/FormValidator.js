class FormValidator {
  constructor(setObject, formElement) {
    this._formElement = formElement;
    this._formSelector = setObject.formSelector;
    this._inputSelector = setObject.inputSelector;
    this._submitButtonSelector = setObject.submitButtonSelector;
    this._inactiveButtonClass = setObject.inactiveButtonClass;
    this._errorClass = setObject.errorClass;
    // this._inputErrorClass = setObject.inputErrorClass;
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListener();
  }
  _setEventListener() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      this._checkInputValidity(input);
      addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }
  _checkInputValidity(input) {
    const messageError = this._formElement.querySelector(`.${input.id}-error`);
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
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputs)) {
      this._disableSubmitButton(this._submitButton, this._inactiveButtonClass);
    } else {
      this._enableSubmitButton(this._submitButton, this._inactiveButtonClass);
    }
  }
  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  }
  resetInputs() {
    this._toggleButtonState();
    Array.from(
      this._formElement.querySelectorAll(this._inputErrorClass)
    ).forEach((span) => {
      this._hideInputError(span);
    });
  }
}
export default FormValidator;
