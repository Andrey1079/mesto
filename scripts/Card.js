export default class Card {
  constructor(card, galleryItemTemplate, openPopupFunc) {
    this._galleryItemTemplate = document
      .querySelector(galleryItemTemplate)
      .content.cloneNode(true);
    this._galeryImage =
      this._galleryItemTemplate.querySelector(".gallery__image");
    this._galeryCaption =
      this._galleryItemTemplate.querySelector(".gallery__city");
    this._gallerylikeButton = this._galleryItemTemplate.querySelector(
      ".gallery__like-button"
    );
    this._galleryTrashButton = this._galleryItemTemplate.querySelector(
      ".gallery__bin-button"
    );
    this._galleryItem =
      this._galleryItemTemplate.querySelector(".gallery__item");
    this._caption = card.name;
    this._url = card.link;
    this.openPopupFunc = openPopupFunc;
  }

  createCard() {
    this._galeryImage.src = this._url;
    this._galeryImage.alt = this._caption;
    this._galeryCaption.textContent = this._caption;
    this._gallerylikeButton.addEventListener("click", (evt) =>
      this._changeLikeButton(this._gallerylikeButton)
    );
    this._galleryTrashButton.addEventListener("click", (evt) => {
      this._deleteGalleryItem(this._galleryItemTemplate);
    });
    this._galeryImage.addEventListener("click", (evt) => {
      this.openPopupFunc(this._galeryImage.src, this._galeryImage.alt);
    });
    return this._galleryItemTemplate;
  }

  _changeLikeButton() {
    this._gallerylikeButton.classList.toggle("gallery__like-button_active");
  }
  _deleteGalleryItem() {
    this._galleryItem.remove();
    this._galleryItem = null;
  }
}
