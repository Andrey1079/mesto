import Popup from "./Popup.js";
export default class PopupError extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupErrMessage = this._popup.querySelector(".popup__error-message");
  }
  showErrMessage(err) {
    this._popupErrMessage.textContent = err;
  }
}
