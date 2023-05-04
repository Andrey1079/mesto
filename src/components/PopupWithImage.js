import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._popupImageSrc = data.src;
    // this._popupImageAlt = data.alt;
    // this._popupImageCaption = data.alt;
    this._image = this._popup.querySelector(".popup__img");
    this._caption = this._popup.querySelector(
      ".popup__place-name-of-big-photo"
    );
  }

  open(imageData) {
    this._image.src = imageData.src;
    this._image.alt = imageData.alt;
    this._caption.textContent = imageData.alt;
    super.open();
  }
}
