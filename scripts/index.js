import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForms from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

//                                                            -----ОБЪЯЛЕНИЕ ПЕРЕМЕННЫХ-----

const popupEditProfile = document.querySelector(".popup-edit-profile");
const editProfilePopupCloseButton = popupEditProfile.querySelector(
  ".popup__close-button"
);
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
const userData = {
  userNameSelector: ".profile__user-name",
  userProfessionSelector: ".profile__user-profession",
};
const galleryItemTemplate = ".gallery-item-template";
const popupAddPhoto = document.querySelector(".popup-add-photo");
const addPhotoPopupCloseButton = popupAddPhoto.querySelector(
  ".popup__close-button"
);
const addPhotoButton = document.querySelector(".profile__add-photo-button");
const formAddPhoto = popupAddPhoto.querySelector(".popup__form_type_add-photo");
const popupBigPhoto = document.querySelector(".popup-big-photo");
const popupBigPhotoCloseButton = popupBigPhoto.querySelector(
  ".popup__close-button"
);

//                                                            -----ФУНКЦИИ-----
// Открытие попапа с увеличенной фотографией
function handleCardClick(link, name) {
  const popupWithImageObject = {};
  popupWithImageObject.src = link;
  popupWithImageObject.alt = name;
  const popupWithImage = new PopupWithImage(
    { data: popupWithImageObject },
    ".popup-big-photo"
  );
  popupWithImage.open();
  popupWithImage.setEventListeners(popupBigPhotoCloseButton);
}

//                                                          -----Объявление классов-----
// валидация форм
const formCardValidator = new FormValidator(settings, formAddPhoto);
const formProfileValidator = new FormValidator(settings, formEditProfile);
formCardValidator.enableValidation();
formProfileValidator.enableValidation();
//
//  галерея из массива
const gallery = new Section(
  {
    items: galleryArray,
    renderer: (item) => {
      const newGalleryCard = new Card(
        item,
        galleryItemTemplate,
        handleCardClick //функция открытия попапа с фото
      );
      gallery.addItem(newGalleryCard.createCard()); //добавляет объект класса card в разметку
    },
  },
  ".gallery__list"
);
//
// добавление карточки галереи
const popupWithFormsAddPhoto = new PopupWithForms(
  {
    submitFunc: (formValues) => {
      const gallery = new Section(
        {
          items: [formValues],
          renderer: (item) => {
            const newGalleryCard = new Card(
              item,
              galleryItemTemplate,
              handleCardClick //функция открытия попапа с фото
            );
            gallery.addItem(newGalleryCard.createCard()); //добавляет объект класса card в разметку
          },
        },
        ".gallery__list"
      );
      gallery.renderItemsFromArray();
    },
  },
  ".popup-add-photo"
);
//
// изменение данных о пользователе
const popupWithFormsUserProfile = new PopupWithForms(
  {
    submitFunc: (formValues) => {
      userInfo.setUserInfo(formValues);
    },
  },
  ".popup-edit-profile"
);
//
// управление данными о пользователе на странице
const userInfo = new UserInfo({ userData: userData });
gallery.renderItemsFromArray();
//
//                                                            -----СОБЫТИЯ-----

// кнопка добавления фото
addPhotoButton.addEventListener("click", (evt) => {
  (evt) => evt.preventDefault();
  formCardValidator.resetInputsErrors();
  popupWithFormsAddPhoto.open();
  popupWithFormsAddPhoto.setEventListeners(addPhotoPopupCloseButton);
});
//
// кнопка редактирования профиля
popupProfileButton.addEventListener("click", () => {
  formProfileValidator.resetInputsErrors();
  formInputUserName.value = userInfo.getUserInfo().name;
  formInputUserProfession.value = userInfo.getUserInfo().profession;
  popupWithFormsUserProfile.open();
  popupWithFormsUserProfile.setEventListeners(editProfilePopupCloseButton);
});
