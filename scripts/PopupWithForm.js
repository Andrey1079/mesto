import Popup from "./Popup.js";
export default class PopupWithForms extends Popup {
  constructor({ createObject }, popupSelector) {
    super(popupSelector);
    this._createObject = createObject;
    this._form = this._popup.querySelector(".popup__form");
  }
  _getInputValues() {
    this._createObject();
  }
  setEventListeners(closeButton) {
    super.setEventListeners(closeButton);
    this._form.addEventListener("submit", () => {
      this._getInputValues.bind(this)();
      this.close();
    });
  }
  close() {
    this._form.reset();
    super.close();
  }
}
