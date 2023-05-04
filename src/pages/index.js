import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  settings,
  galleryArray,
  popupProfileButton,
  formEditProfile,
  userData,
  galleryItemTemplate,
  addPhotoButton,
  formAddPhoto,
} from "../utils/constants.js";
import "./index.css";
//                                                            -----ОБЪЯЛЕНИЕ ПЕРЕМЕННЫХ-----

//                                                            -----ФУНКЦИИ-----
// Открытие попапа с увеличенной фотографией
function handleCardClick(link, name) {
  const popupWithImageObject = {};
  popupWithImageObject.src = link;
  popupWithImageObject.alt = name;
  popupWithImage.open(popupWithImageObject);
}
//
function createCard(item) {
  const newGalleryCard = new Card(
    item,
    galleryItemTemplate,
    handleCardClick //функция открытия попапа с фото
  );
  return newGalleryCard.setCard(); //возвращает готовую карточку
}
//                                                          -----Объявление классов-----
// попап с большой фотографией
const popupWithImage = new PopupWithImage(".popup-big-photo");
popupWithImage.setEventListeners();
//
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
    renderer: createCard,
  },
  ".gallery__list"
);
gallery.renderItemsFromArray();
//
// добавление карточки галереи
const popupWithFormsAddPhoto = new PopupWithForms(
  {
    submitFunc: (newCard) => gallery.addItem(createCard(newCard)),
  },
  ".popup-add-photo"
);
popupWithFormsAddPhoto.setEventListeners();
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
popupWithFormsUserProfile.setEventListeners();
//
// управление данными о пользователе на странице
const userInfo = new UserInfo({ userData: userData });

//
//                                                            -----СОБЫТИЯ-----

// кнопка добавления фото
addPhotoButton.addEventListener("click", (evt) => {
  (evt) => evt.preventDefault();
  formCardValidator.resetInputsErrors();
  popupWithFormsAddPhoto.open();
});
//
// кнопка редактирования профиля
popupProfileButton.addEventListener("click", () => {
  formProfileValidator.resetInputsErrors();
  popupWithFormsUserProfile.setInputValues(userInfo.getUserInfo());
  popupWithFormsUserProfile.open();
});
