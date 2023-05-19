import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitFunc = "";
    this._form = this._popup.querySelector(".popup__submit-button");
  }

  setSubmit(submitFunc) {
    this._submitFunc = submitFunc;
  }

  setEventListeners() {
    this._submitButton.addEventListener("click", () => {
      this._submitFunc();
    });
    super.setEventListeners();
  }
}
