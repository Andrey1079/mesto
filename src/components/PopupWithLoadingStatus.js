import Popup from "./Popup.js";

export default class PopupWithLoadingStatus extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".popup__submit-button");
  }
  renderLoading(isLoading, text) {
    if (isLoading) {
      this._submitButton.value = text;
    } else {
      this._submitButton.value = text;
    }
  }
}
