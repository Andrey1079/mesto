import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
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
const addPhotoPopupCloseButton = popupAddPhoto.querySelector(
  ".popup__close-button"
);
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
const popupBigPhotoCloseButton = popupBigPhoto.querySelector(
  ".popup__close-button"
);
const popupBigPohotoImage = popupBigPhoto.querySelector(".popup__img");
const popupBigPhotoDescription = popupBigPhoto.querySelector(
  ".popup__place-name-of-big-photo"
);

//                                                            -----ФУНКЦИИ-----

// редактирование профиля
// function editProfile(evt) {
//   userName.textContent = formInputUserName.value;
//   userProfession.textContent = formInputUserProfession.value;
//   closePopup(popupEditProfile);
// }

// Создать галлерею
function careateGallery(array) {
  const gallery = new Section(
    {
      items: array,
      renderer: (item) => {
        const newGalleryCard = new Card(
          item,
          galleryItemTemplate,
          handleCardClick
        );
        gallery.additem(newGalleryCard.createCard());
      },
    },
    ".gallery__list"
  );
  gallery.renderItemsFromArray();
}
careateGallery(galleryArray);

// Создать новую карточку галереи
function addNewPlace() {
  const newGalleryItem = {};
  newGalleryItem.name = formInputPlace.value;
  newGalleryItem.link = formInputPlaceLink.value;
  careateGallery([newGalleryItem]);
  closePopup(popupAddPhoto);
}
// Открытие попапа с увеличенной фотографией
function handleCardClick(link, name) {
  const popupWithImageObject = {};
  popupWithImageObject.src = link;
  popupWithImageObject.alt = name;
  popupWithImageObject.caption = name;
  const popupWithImage = new PopupWithImage(
    { data: popupWithImageObject },
    ".popup-big-photo"
  );
  popupWithImage.open();
  popupWithImage.setEventListeners(popupBigPhotoCloseButton);
}

//                                                            -----СОБЫТИЯ-----
// Кнопка редактирования профиля
popupProfileButton.addEventListener("click", () => {
  formEditProfile.reset();
  formProfileValidator.resetInputsErrors();
  formInputUserName.value = userName.textContent;
  formInputUserProfession.value = userProfession.textContent;
  // popupEditProfile1.open();
});
// кнопка добавления фото
addPhotoButton.addEventListener("click", function () {
  // formAddPhoto.reset();
  // formCardValidator.resetInputsErrors();
  const popupWithImage = new Popup(".popup-add-photo");
  popupWithImage.open();
  popupWithImage.setEventListeners(addPhotoPopupCloseButton);
});
// кнопка submit редактирования профиля
formEditProfile.addEventListener("submit", editProfile);
// кнопка submit добавления фото
formAddPhoto.addEventListener("submit", () => {
  addNewPlace();
});
// кнопки закрытия попапов
// allClosePopupButtons.forEach((button) => {
//   const buttonsPopup = button.closest(".popup");
//   button.addEventListener("click", () => closePopup(buttonsPopup));
// });

const formCardValidator = new FormValidator(settings, formAddPhoto);
const formProfileValidator = new FormValidator(settings, formEditProfile);
formCardValidator.enableValidation();
formProfileValidator.enableValidation();

export {
  // openPopup,
  popupBigPhoto,
  popupBigPohotoImage,
  popupBigPhotoDescription,
};
