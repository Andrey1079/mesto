import Popup from "./Popup.js";
export default class PopupWithForms extends Popup {
  constructor({ submitFunc }, popupSelector) {
    super(popupSelector); //div попапа
    this._submitFunc = submitFunc;
    this._form = this._popup.querySelector(".popup__form");
    this._input;
  }
  _getInputValues() {
    this._formValues = {};
    this._inputs = Array.from(this._form.querySelectorAll(".popup__form-item"));
    this._inputs.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }
  setEventListeners(closeButton) {
    super.setEventListeners(closeButton);
    this._SubmitCallback = (evt) => {
      evt.preventDefault();
      this._submitFunc(this._getInputValues.bind(this)());
      this.close();
    };
    this._form.addEventListener("submit", this._SubmitCallback);
  }
  close() {
    this._form.removeEventListener("submit", this._SubmitCallback);
    this._form.reset();
    super.close();
  }
}
