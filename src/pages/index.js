import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  settings,
  galleryArray,
  popupProfileButton,
  formEditProfile,
  userDataSelectors,
  userData,
  galleryItemTemplate,
  addPhotoButton,
  formAddPhoto,
  avatarEditButton,
  formEditAvatar,
  popupErrorMessage,
} from "../utils/constants.js";
import "./index.css";
import Popup from "../components/Popup.js";
//                                                            -----ОБЪЯЛЕНИЕ ПЕРЕМЕННЫХ-----
//                                                            -----ФУНКЦИИ-----

// Функция формирования объекта для профиля
function setUserDataObj(res) {
  userData.name = res.name;
  userData.profession = res.about;
  userData.url = res.avatar;
  userData.cohort = res.cohort;
  userData.id = res._id;
  return userData;
}
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
// объявление класса Api
//
const api = new Api(
  {
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
    headers: {
      authorization: "02d169df-2e89-48d4-b456-d324fa7fca22",
      "Content-Type": "application/json",
    },
  },
  {
    showErrFunc: (err) => {
      popupErrorMessage.textContent = err;
      popupError.open();
    },
  }
);

//
// объявление объекта попап с большой фотографией
const popupWithImage = new PopupWithImage(".popup-big-photo");
popupWithImage.setEventListeners();
//
// валидация форм
const formCardValidator = new FormValidator(settings, formAddPhoto);
const formProfileValidator = new FormValidator(settings, formEditProfile);
const formAvatarValidation = new FormValidator(settings, formEditAvatar);
formCardValidator.enableValidation();
formProfileValidator.enableValidation();
formAvatarValidation.enableValidation();
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
// объявление объекта добавление карточки галереи
const popupWithFormsAddPhoto = new PopupWithForms(
  {
    submitFunc: (newCard) => gallery.addItem(createCard(newCard)),
  },
  ".popup-add-photo"
);
popupWithFormsAddPhoto.setEventListeners();
//
//объявление объекта изменения данных о пользователе
const popupWithFormsUserProfile = new PopupWithForms(
  {
    submitFunc: (formValues) => {
      api.setUserInfo(formValues).then((res) => {
        setUserDataObj(res);
        userInfo.setUserInfo(userData);
      });
    },
  },
  ".popup-edit-profile"
);
popupWithFormsUserProfile.setEventListeners();
//
// объявление объекта изменение аватарки пользователя
const popupWithFormsEditAvatar = new PopupWithForms(
  {
    submitFunc: (formValues) => {
      api.patchAvatar(formValues).then((res) => {
        userInfo.setAvatar(setUserDataObj(res));
      });
    },
  },
  ".popup-edit-avatar"
);
popupWithFormsEditAvatar.setEventListeners();
//
// объявление объекта открытия окна подстверждения удаления карточки
const popupAreYouShure = new Popup(".popup-edit-avatar");
popupAreYouShure.setEventListeners();
//
// объявление попапа с сообщением об ошибке
const popupError = new Popup(".popup-error");
popupError.setEventListeners();
//
//
//объявление объекта управление данными о пользователе на странице

const userInfo = new UserInfo({ userDataSelectors: userDataSelectors });
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

avatarEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  formAvatarValidation.resetInputsErrors();
  popupWithFormsEditAvatar.open();
});
api.getUserInfo().then((res) => {
  setUserDataObj(res);
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData);
});
