import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import PopupError from "../components/PopupError.js";
import {
  settings,
  popupProfileButton,
  formEditProfile,
  userDataSelectors,
  galleryItemTemplate,
  addPhotoButton,
  formAddPhoto,
  avatarEditButton,
  formEditAvatar,
} from "../utils/constants.js";
import "./index.css";
//
// функция сообщения об ошибке от сервера
function showServerErr(err) {
  console.log(err);
  popupError.showErrMessage(err);
  popupError.open();
}

//                                                        -----Галерея-----
//
// получение имени пользователя
function getUserId() {
  return userInfo.getUserId();
}

// установка/снятие лайка
function likesToggle(id, method, card) {
  api
    .likesToggle(id, method)
    .then((res) => {
      card.setLikes(res.likes);
    })
    .catch((err) => showServerErr(err));
}
//
//
//открытие попапа с подтверждением
function clickBinButton(card, id) {
  popupAreYouSure.open();
  popupAreYouSure.setSubmit(() => {
    popupAreYouSure.renderLoading(true, "Удаление...");
    api
      .deleteCard(id)
      .then(() => {
        card.removeCard();
        popupAreYouSure.close();
      })
      .catch((err) => showServerErr(err))
      .finally(() => {
        popupAreYouSure.renderLoading(false, "Удалить");
      });
  });
}
//
// Открытие попапа с увеличенной фотографией
function handleCardClick(link, name) {
  const popupWithImageObject = {};
  popupWithImageObject.src = link;
  popupWithImageObject.alt = name;
  popupWithImage.open(popupWithImageObject);
}
//
//функция создания карточки галлереи
function createCard(item) {
  const newGalleryCard = new Card(
    item,
    galleryItemTemplate,
    handleCardClick,
    clickBinButton,
    likesToggle,
    getUserId()
  );
  return newGalleryCard.setCard(); //возвращает готовую карточку
}
//  Объект Section размещает карточки на странице
const gallery = new Section(
  {
    renderer: createCard,
  },
  ".gallery__list"
);
//
// функция сабмита добавления фотографии
function submitFuncForPopupWithFormsAddPhoto(newCard) {
  popupWithFormsAddPhoto.renderLoading(true, "Сохранение...");

  api
    .postNewCard(newCard)
    .then((res) => {
      gallery.addItem(createCard(res));
      popupWithFormsAddPhoto.close();
    })
    .catch((err) => showServerErr(err))
    .finally(() => {
      popupWithFormsAddPhoto.renderLoading(false, "Создать");
    });
}
// объявление объекта добавление карточки галереи
const popupWithFormsAddPhoto = new PopupWithForms(
  submitFuncForPopupWithFormsAddPhoto,
  ".popup-add-photo"
);
popupWithFormsAddPhoto.setEventListeners();
//
//                                                              -----*****-----
//
//                                                            -----Профиль юзера-----
//
//
// функция сабмит в форме изменения данных пользователя
function submitPopupWithFormsUserProfile(formValues) {
  popupWithFormsUserProfile.renderLoading(true, "Сохранение...");
  api
    .setUserInfo(formValues)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithFormsUserProfile.close();
    })
    .catch((err) => showServerErr(err))
    .finally(() => {
      popupWithFormsUserProfile.renderLoading(false, "Сохранить");
    });
}

//объявление объекта изменения данных о пользователе
const popupWithFormsUserProfile = new PopupWithForms(
  submitPopupWithFormsUserProfile,
  ".popup-edit-profile"
);
popupWithFormsUserProfile.setEventListeners();
//
// функция сабмит изменения аватарки пользователя
function submitPopupWithFormsEditAvatar(formValues) {
  popupWithFormsEditAvatar.renderLoading(true, "Сохранение...");
  api
    .patchAvatar(formValues)
    .then((res) => {
      userInfo.setAvatar(res);
      popupWithFormsEditAvatar.close();
    })
    .catch((err) => showServerErr(err))
    .finally(() => {
      popupWithFormsEditAvatar.renderLoading(false, "Сохранить");
    });
}
// объявление объекта изменение аватарки пользователя
const popupWithFormsEditAvatar = new PopupWithForms(
  submitPopupWithFormsEditAvatar,
  ".popup-edit-avatar"
);
popupWithFormsEditAvatar.setEventListeners();
//
//                                                                -----*****-----
//
//                                                          -----Попап с большой фотографией-----
//
const popupWithImage = new PopupWithImage(".popup-big-photo");
popupWithImage.setEventListeners();
//
//                                                                -----*****-----
//
//                                                        -----Попап "Вы уверены?"-----

// объявление объекта открытия окна подстверждения удаления карточки

const popupAreYouSure = new PopupWithConfirmation(".popup-confirm");
popupAreYouSure.setEventListeners();
//
//                                                                -----*****-----
//
//                                                      -----Попап сообщение об ошибке-----

// объявление попапа с сообщением об ошибке
const popupError = new PopupError(".popup-error");
popupError.setEventListeners();
//
//                                                                -----*****-----
//
//                                                      -----class UserInfo-----

const userInfo = new UserInfo({ userDataSelectors: userDataSelectors });
//
//                                                          -----*****-----

//                                                      -----class Api-----
//
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "02d169df-2e89-48d4-b456-d324fa7fca22",
    "Content-Type": "application/json",
  },
});
//
//                                                          -----*****-----

//                                                      -----class FormValidator-----
//
const formCardValidator = new FormValidator(settings, formAddPhoto);
const formProfileValidator = new FormValidator(settings, formEditProfile);
const formAvatarValidation = new FormValidator(settings, formEditAvatar);
formCardValidator.enableValidation();
formProfileValidator.enableValidation();
formAvatarValidation.enableValidation();
//
//                                                          -----*****-----

//                                                     -----СОБЫТИЯ-----

// кнопка добавления фото
addPhotoButton.addEventListener("click", () => {
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
//
//  кнопка изменения аватара
avatarEditButton.addEventListener("click", () => {
  formAvatarValidation.resetInputsErrors();
  popupWithFormsEditAvatar.open();
});
//                                                          -----*****-----
//
//                                              -----Инициализация страницы-----
//
api
  .getStartInfo()
  .then((startData) => {
    const [userData, getInitialCards] = startData;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    // перебирает массив карточек и запускает createCard
    gallery.renderItemsFromArray(getInitialCards.reverse());
  })
  .catch((err) => showServerErr(err));
//                                                          -----*****-----
