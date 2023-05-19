export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector(".popup__close-button ");
    this._submitButton = this._popup.querySelector(".popup__submit-button");
  }
  //
  open() {
    this._popup.classList.add("popup_visible");
    this._popup.addEventListener("mousedown", this._closePopupByClickOverlay);
    document.addEventListener("keydown", this._handleEscClose);
  }
  //
  close() {
    this._popup.classList.remove("popup_visible");
    this._popup.removeEventListener(
      "mousedown",
      this._closePopupByClickOverlay
    );
    document.removeEventListener("keydown", this._handleEscClose);
  }
  //
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  //
  _closePopupByClickOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };
  //
  setEventListeners() {
    this._popupCloseButton.addEventListener("click", this.close.bind(this));
  }

  renderLoading(isLoading, text) {
    if (isLoading) {
      this._submitButton.value = text;
    } else {
      this._submitButton.value = text;
    }
  }
}
