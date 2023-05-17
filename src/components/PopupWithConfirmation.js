import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitFunc) {
    super(popupSelector);
    this._submitFunc = "";
    this._submitButton = this._popup.querySelector(".popup__submit-button");
  }

  setSubmit(submitFunc) {
    this._submitFunc = submitFunc;
  }

  setEventListeners() {
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._submitFunc();
    });
    super.setEventListeners();
  }
}
