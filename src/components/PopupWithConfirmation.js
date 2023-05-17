import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { submitFunc }) {
    super(popupSelector);
    this._submitFunc = submitFunc;
    this._submitButton = this._popup.querySelector(".popup__submit-button");
  }
  open(id, card) {
    this._submitCallback = (evt) => {
      this._submitFunc(id);
      this.close();
      card.remove();
      card = null;
    };
    this._submitButton.addEventListener("click", this._submitCallback);
    super.open();
  }
}
