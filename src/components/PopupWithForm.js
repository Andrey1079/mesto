import PopupWithLoadingStatus from "./PopupWithLoadingStatus.js";
export default class PopupWithForms extends PopupWithLoadingStatus {
  constructor(submitFunc, popupSelector) {
    super(popupSelector);
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
    this._submitCallback = (evt) => {
      evt.preventDefault();
      this._submitFunc(this._getInputValues.bind(this)());
    };
    this._form.addEventListener("submit", this._submitCallback);
  }
  close() {
    this._form.reset();
    super.close();
  }
}
