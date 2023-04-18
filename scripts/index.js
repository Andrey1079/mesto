import Card from "./Card.js";
import { FormValidator, settings } from "./FormValidator.js";

//                                                            -----ОБЪЯЛЕНИЕ ПЕРЕМЕННЫХ-----

const allClosePopupButtons = document.querySelectorAll(".popup__close-button");
const popupEditProfile = document.querySelector(".popup-edit-profile");
const editProfileButton = document.querySelector(
  ".profile__edit-profile-button"
);
const formEditProfile = popupEditProfile.querySelector(
  ".popup__form_type_edit-profile"
);
const formInputUserName = formEditProfile.querySelector(
  ".popup__form-item_type_name"
);
const formInputUserProfession = formEditProfile.querySelector(
  ".popup__form-item_type_profession"
);
const userName = document.querySelector(".profile__user-name");
const userProfession = document.querySelector(".profile__user-profession");
const galleryItemTemplate = ".gallery-item-template";
const galleryContainer = document.querySelector(".gallery__list");
const popupAddPhoto = document.querySelector(".popup-add-photo");
const addPhotoButton = document.querySelector(".profile__add-photo-button");
const formAddPhoto = popupAddPhoto.querySelector(".popup__form_type_add-photo");
const formInputPlace = formAddPhoto.querySelector(
  ".popup__form-item_type_place"
);
const formInputPlaceLink = formAddPhoto.querySelector(
  ".popup__form-item_type_img-link"
);
const popupBigPhoto = document.querySelector(".popup-big-photo");
const popupBigPohotoImage = popupBigPhoto.querySelector(".popup__img");
const popupBigPhotoDescription = popupBigPhoto.querySelector(
  ".popup__place-name-of-big-photo"
);

//                                                            -----ФУНКЦИИ-----

// открытие попапа
function openPopup(item) {
  item.classList.add("popup_visible");
  item.addEventListener("click", closePopupByClickOverlay);
  document.addEventListener("keydown", checkPushEscape, item);
}

// закрытие попапа по нажатию esc
function checkPushEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_visible"));
  }
}

// закрытие попапа
function closePopup(item) {
  item.classList.remove("popup_visible");
  item.removeEventListener("click", closePopupByClickOverlay);
  document.removeEventListener("keydown", checkPushEscape);
}

// редактирование профиля
function editProfile(evt) {
  userName.textContent = formInputUserName.value;
  userProfession.textContent = formInputUserProfession.value;
  closePopup(popupEditProfile);
}

// закрытие попапа по клику на оверлэй
function closePopupByClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
// Добавить новое место в галерею
function addNewGalleryCard(card) {
  const GalleryCard = new Card(card, galleryItemTemplate);
  galleryContainer.prepend(GalleryCard.createCard());
}
galleryArray.forEach((card) => {
  addNewGalleryCard(card);
});
// Создать новую карточку галереи
function addNewPlace() {
  const newGalleryItem = {};
  newGalleryItem.name = formInputPlace.value;
  newGalleryItem.link = formInputPlaceLink.value;
  addNewGalleryCard(newGalleryItem);
  closePopup(popupAddPhoto);
}

//                                                            -----СОБЫТИЯ-----
// Кнопка редактирования профиля
editProfileButton.addEventListener("click", function () {
  formInputUserName.value = userName.textContent;
  formInputUserProfession.value = userProfession.textContent;
  const EditProfileValidator = new FormValidator(settings, formEditProfile);
  EditProfileValidator.enableValidation();
  openPopup(popupEditProfile);
});
// кнопка добавления фото
addPhotoButton.addEventListener("click", function () {
  formAddPhoto.reset();
  const AddPhotoValidator = new FormValidator(settings, formAddPhoto);
  AddPhotoValidator.enableValidation();
  openPopup(popupAddPhoto);
});
// кнопка submit редактирования профиля
formEditProfile.addEventListener("submit", editProfile);
// кнопка submit добавления фото
formAddPhoto.addEventListener("submit", () => {
  addNewPlace();
});
// кнопки закрытия попапов
allClosePopupButtons.forEach((button) => {
  const buttonsPopup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(buttonsPopup));
});
export {
  openPopup,
  popupBigPhoto,
  popupBigPohotoImage,
  popupBigPhotoDescription,
};
