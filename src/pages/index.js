import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
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
  popupErrorMessage,
  userNameField,
  submitAddPhoto,
  submitChangeAvatar,
  submitEditProfile,
  submitDelCard,
} from "../utils/constants.js";
import "./index.css";
import Popup from "../components/Popup.js";
//
// функция сообщения об ошибке от сервера
function showServerErr(err) {
  popupErrorMessage.textContent = err;
  popupError.open();
}
//
// функция показывающая процесс обработки запроса сервером
function renderLoading(isLoading, button, text) {
  if (isLoading) {
    console.log("sadfa");
    button.value = text;
  } else {
    button.value = text;
  }
}
//                                                        -----Галерея-----
//
// получение имени пользователя
function getCurrentUserName() {
  return userNameField.textContent;
}

// установка/снятие лайка
function likesToggle(id, method) {
  api
    .likesToggle(id, method)
    .then((res) => {
      this.setLikes(res.likes);
    })
    .catch((err) => showServerErr(err));
}
//
//
//открытие попапа с подтверждением
function clickBinButton(card, id) {
  popupAreYouSure.open();
  popupAreYouSure.setSubmit(() => {
    renderLoading(true, submitDelCard, "Удаление...");
    api
      .deleteCard(id)
      .then(() => {
        card.remove();
      })
      .catch((err) => showServerErr(err))
      .finally(() => {
        renderLoading(false, submitDelCard, "Удалить");

        popupAreYouSure.close();
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
    getCurrentUserName
  );
  return newGalleryCard.setCard(userNameField); //возвращает готовую карточку
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
function SubmitFuncForPopupWithFormsAddPhoto(newCard) {
  renderLoading(true, submitAddPhoto, "Сохранение...");

  api
    .postNewCard(newCard)
    .then((res) => {
      gallery.addItem(createCard(res));
    })
    .catch((err) => showServerErr(err))
    .finally(() => {
      renderLoading(false, submitAddPhoto, "Создать");
      popupWithFormsAddPhoto.close();
    });
}
// объявление объекта добавление карточки галереи
const popupWithFormsAddPhoto = new PopupWithForms(
  SubmitFuncForPopupWithFormsAddPhoto,
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
  renderLoading(true, submitEditProfile, "Сохранение...");
  api
    .setUserInfo(formValues)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((err) => showServerErr(err))
    .finally(() => {
      renderLoading(false, submitEditProfile, "Сохранить");
      popupWithFormsUserProfile.close();
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
  renderLoading(true, submitChangeAvatar, "Сохранение...");
  api
    .patchAvatar(formValues)
    .then((res) => {
      userInfo.setAvatar(res);
    })
    .catch((err) => showServerErr(err))
    .finally(() => {
      renderLoading(false, submitChangeAvatar, "Сохранить");
      popupWithFormsEditAvatar.close();
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

function SubmitFuncForPopupWithConfirmation(id) {
  api.deleteCard(id).then(() => {
    this.close();
  });
}
const popupAreYouSure = new PopupWithConfirmation(
  ".popup-confirm",
  SubmitFuncForPopupWithConfirmation
);
popupAreYouSure.setEventListeners();
//
//                                                                -----*****-----
//
//                                                      -----Попап сообщение об ошибке-----

// объявление попапа с сообщением об ошибке
const popupError = new Popup(".popup-error");
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
