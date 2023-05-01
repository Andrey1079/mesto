import Popup from "./Popup.js";
import Section from "./Section.js";
export default class PopupWithImage extends Popup {
  constructor({ data }, popupSelector) {
    super(popupSelector);
    this._popupImageSrc = data.src;
    this._popupImageAlt = data.alt;
    this._popupImageCaption = data.caption;
    this._image = this._popup.querySelector(".popup__img");
    this._caption = this._popup.querySelector(
      ".popup__place-name-of-big-photo"
    );
  }

  open() {
    this._image.src = this._popupImageSrc;
    this._image.alt = this._popupImageAlt;
    this._caption.textContent = this._popupImageAlt;
    super.open();
  }
}
