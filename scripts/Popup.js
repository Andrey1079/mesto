export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this._popup.classList.add("popup_visible");
    this._popup.addEventListener(
      "mousedown",
      this._closePopupByClickOverlay.bind(this)
    );
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }
  close() {
    this._popup.classList.remove("popup_visible");
    this._popup.removeEventListener(
      "click",
      this._closePopupByClickOverlay.bind(this)
    );
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _closePopupByClickOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  setEventListeners(buttonClosePopup) {
    buttonClosePopup.addEventListener("click", this.close.bind(this));
  }
}
