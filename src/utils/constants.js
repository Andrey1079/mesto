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
export const userDataSelectors = {
  userNameSelector: ".profile__user-name",
  userProfessionSelector: ".profile__user-profession",
  userAvatarSelector: ".profile__avatar-edit-button",
};
export const userNameField = document.querySelector(
  userDataSelectors.userNameSelector
);
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
export const popupErrorMessage = document.querySelector(
  ".popup__error-message"
);
export const submitChangeAvatar = popupEditAvatar.querySelector(
  ".popup__submit-button"
);
export const submitAddPhoto = popupAddPhoto.querySelector(
  ".popup__submit-button"
);
export const submitEditProfile = popupEditProfile.querySelector(
  ".popup__submit-button"
);

export const submitDelCard = document
  .querySelector(".popup-confirm")
  .querySelector(".popup__submit-button");
