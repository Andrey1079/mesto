import PopupWithLoadingStatus from "./PopupWithLoadingStatus";

export default class PopupWithConfirmation extends PopupWithLoadingStatus {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitFunc = "";
    this._submitButton = this._popup.querySelector(".popup__submit-button");
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
