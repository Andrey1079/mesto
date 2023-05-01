import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
//                                                            -----ОБЪЯЛЕНИЕ ПЕРЕМЕННЫХ-----

const allClosePopupButtons = document.querySelectorAll(".popup__close-button");
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupProfileButton = document.querySelector(
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
// const galleryContainer = document.querySelector(".gallery__list");
const popupAddPhoto = document.querySelector(".popup-add-photo");
const addPhotoButton = document.querySelector(".profile__add-photo-button");
// const forms = document.querySelectorAll(".popup__form");
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
  item.addEventListener("mousedown", closePopupByClickOverlay);
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
// function addNewGalleryCard(card) {
//   const galleryCard = new Card(card, galleryItemTemplate, openBigGalleryItem);
//   galleryContainer.prepend(galleryCard.createCard());
// }
// galleryArray.forEach((card) => {
//   addNewGalleryCard(card);
// });

const gallery = new Section(
  {
    items: galleryArray,
    renderer: (item) => {
      const newGalleryCard = new Card(
        item,
        galleryItemTemplate,
        openBigGalleryItem
      );
      gallery.additem(newGalleryCard.createCard());
    },
  },
  ".gallery__list"
);
gallery.renderItemsFromArray();
// Создать новую карточку галереи
function addNewPlace() {
  const newGalleryItem = {};
  newGalleryItem.name = formInputPlace.value;
  newGalleryItem.link = formInputPlaceLink.value;
  addNewGalleryCard(newGalleryItem);
  closePopup(popupAddPhoto);
}
// Открытие попапа с увеличенной фотографией
function openBigGalleryItem(link, name) {
  openPopup(popupBigPhoto);
  popupBigPohotoImage.src = link;
  popupBigPohotoImage.alt = name;
  popupBigPhotoDescription.textContent = name;
}

//                                                            -----СОБЫТИЯ-----
// Кнопка редактирования профиля
popupProfileButton.addEventListener("click", function () {
  formEditProfile.reset();
  formProfileValidator.resetInputsErrors();
  formInputUserName.value = userName.textContent;
  formInputUserProfession.value = userProfession.textContent;

  openPopup(popupEditProfile);
});
// кнопка добавления фото
addPhotoButton.addEventListener("click", function () {
  formAddPhoto.reset();
  formCardValidator.resetInputsErrors();
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

const formCardValidator = new FormValidator(settings, formAddPhoto);
const formProfileValidator = new FormValidator(settings, formEditProfile);
formCardValidator.enableValidation();
formProfileValidator.enableValidation();

export {
  openPopup,
  popupBigPhoto,
  popupBigPohotoImage,
  popupBigPhotoDescription,
};
