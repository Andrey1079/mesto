import { userData } from "../utils/constants";

export default class Card {
  constructor(
    card,
    galleryItemTemplate,
    openPopupFunc,
    openPopupConfirm,
    likesToggleFunc
  ) {
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
    this._like_counter = this._galleryItemTemplate.querySelector(
      ".gallery__like-counter"
    );
    this._likesArray = card.likes;
    this._likesQuantity = card.likes.length;
    this._cardId = card._id;
    this._galleryItemTemplate.querySelector(".gallery__item");
    this._caption = card.name;
    this._url = card.link;
    this._cardOwner = card.owner.name;
    this.openPopupFunc = openPopupFunc;
    this.openPopupConfirm = openPopupConfirm;
    this._likesToggleFunc = likesToggleFunc;
  }

  setCard() {
    this._checkOwnerCard(this._cardOwner);
    this.setLikes(this._likesArray);
    this._setEventLIsteners();
    this._galeryImage.src = this._url;
    this._galeryImage.alt = this._caption;
    this._galeryCaption.textContent = this._caption;
    return this._galleryItemTemplate;
  }
  _setEventLIsteners() {
    this._gallerylikeButton.addEventListener("click", (evt) =>
      this._likesToggleFunc(this._cardId, this._likesArray)
    );

    this._galleryTrashButton.addEventListener("click", (evt) => {
      this._deleteGalleryItem(this._galleryItemTemplate);
    });
    this._galeryImage.addEventListener("click", (evt) => {
      this.openPopupFunc(this._galeryImage.src, this._galeryImage.alt);
    });
  }

  _deleteGalleryItem() {
    this.openPopupConfirm(this._cardId, this._galleryItem);
  }
  _checkOwnerCard(user) {
    if (!(user === userData.name)) {
      this._galleryTrashButton.classList.add("gallery__bin-button_invisible");
    }
  }
  setLikes(likesArray) {
    if (likesArray.some((item) => item.name === userData.name)) {
      this._gallerylikeButton.classList.add("gallery__like-button_active");
    } else {
      this._gallerylikeButton.classList.remove("gallery__like-button_active");
    }
    this._like_counter.textContent = likesArray.length;
    this._likesArray = likesArray;
  }
}
