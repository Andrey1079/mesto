import Popup from "./Popup.js";
export default class PopupWithForms extends Popup {
  constructor({ submitFunc }, popupSelector) {
    super(popupSelector); //div попапа
    this._submitFunc = submitFunc;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__form-item");
  }
  _getInputValues() {
    this._formValues = {};
    this._inputs = Array.from(this._inputs);
    this._inputs.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }
  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._SubmitCallback = (evt) => {
      evt.preventDefault();
      this._submitFunc(this._getInputValues.bind(this)());
      this.close();
    };
    this._form.addEventListener("submit", this._SubmitCallback);
  }
  close() {
    this._form.reset();
    super.close();
  }
}
