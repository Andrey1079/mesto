export const galleryArray = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  errorClass: "popup__form-item-error_visible",
  inputErrorClass: ".popup__form-item-error",
};
export const popupEditProfile = document.querySelector(".popup-edit-profile");
export const popupProfileButton = document.querySelector(
  ".profile__edit-profile-button"
);
export const formEditProfile = popupEditProfile.querySelector(
  ".popup__form_type_edit-profile"
);
export const userData = {
  userNameSelector: ".profile__user-name",
  userProfessionSelector: ".profile__user-profession",
};
export const galleryItemTemplate = ".gallery-item-template";
export const popupAddPhoto = document.querySelector(".popup-add-photo");
export const addPhotoButton = document.querySelector(
  ".profile__add-photo-button"
);
export const formAddPhoto = popupAddPhoto.querySelector(
  ".popup__form_type_add-photo"
);
export const popupEditAvatar = document.querySelector(".popup-edit-avatar");
export const avatarEditButton = document.querySelector(
  ".profile__avatar-edit-button"
);
export const formEditAvatar = popupEditAvatar.querySelector(
  ".popup__form_type_edit-avatar"
);
