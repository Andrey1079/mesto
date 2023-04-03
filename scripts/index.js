//                                                            -----ОБЪЯЛЕНИЕ ПЕРЕМЕННЫХ-----
// кнопки закрытия попапов
const allClosePopupButtons = document.querySelectorAll(".popup__close-button");
//---Редактирование профиля---
// попап
const popupEditProfile = document.querySelector(".popup-edit-profile");
// кнопка
const editProfileButton = document.querySelector(
  ".profile__edit-profile-button"
);
// форма
const formEditProfile = popupEditProfile.querySelector(
  ".popup__form_type_edit-profile"
);
// поле ввода имени
const formInputUserName = formEditProfile.querySelector(
  ".popup__form-item_type_name"
);
// поле ввода профессии
const formInputUserProfession = formEditProfile.querySelector(
  ".popup__form-item_type_profession"
);
//
const userName = document.querySelector(".profile__user-name");
const userProfession = document.querySelector(".profile__user-profession");

//---Галерея---
// попап
const popupAddPhoto = document.querySelector(".popup-add-photo");
// темплэйт
const galleryItemTemplate = document.querySelector(
  ".gallery-item-template"
).content;
// галерея
const galleryContainer = document.querySelector(".gallery__list");
// кнопка добавления фото
const addPhotoButton = document.querySelector(".profile__add-photo-button");
// форма
const formAddPhoto = popupAddPhoto.querySelector(".popup__form_type_add-photo");
// название места
const formInputPlace = formAddPhoto.querySelector(
  ".popup__form-item_type_place"
);
// ссылка
const formInputPlaceLink = formAddPhoto.querySelector(
  ".popup__form-item_type_img-link"
);
// попап увеличенного фото
const popupBigPhoto = document.querySelector(".popup-big-photo");
// увеличенное фото
const popupBigPohotoImage = popupBigPhoto.querySelector(".popup__img");
// название увеличенного фото
const popupBigPhotoDescription = popupBigPhoto.querySelector(
  ".popup__place-name-of-big-photo"
);

//                                                            -----ФУНКЦИИ-----
// создание карточки галереи
function createCard(item) {
  const galleryElement = galleryItemTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);
  const galeryImage = galleryElement.querySelector(".gallery__image");
  const galeryCaption = galleryElement.querySelector(".gallery__city");
  const gallerylikeButton = galleryElement.querySelector(
    ".gallery__like-button"
  );
  const galleryTrashButton = galleryElement.querySelector(
    ".gallery__bin-button"
  );
  galeryImage.src = item.link;
  galeryImage.alt = item.name;
  galeryCaption.textContent = item.name;
  gallerylikeButton.addEventListener("click", (evt) =>
    changeLikeButton(evt.target)
  );
  galleryTrashButton.addEventListener("click", (evt) => {
    deleteGalleryItem(evt.target.closest(".gallery__item"));
  });
  galeryImage.addEventListener("click", (evt) => {
    openBigGalleryItem(galeryImage.src, galeryImage.alt);
  });
  return galleryElement;
}
// добавить карточку в HTML
function addNewGalleryCard(item, gallery) {
  gallery.prepend(createCard(item));
}
galleryArray.forEach((card) => addNewGalleryCard(card, galleryContainer));
// создать карточку галлереи
function addNewPlace(evt) {
  const newGalleryItem = {};
  newGalleryItem.name = formInputPlace.value;
  newGalleryItem.link = formInputPlaceLink.value;
  addNewGalleryCard(newGalleryItem, galleryContainer);
  closePopup(popupAddPhoto);
}
// удалить карточку галлереи
function deleteGalleryItem(item) {
  item.remove();
}
// открыть большое фото
function openBigGalleryItem(link, name) {
  openPopup(popupBigPhoto);
  popupBigPohotoImage.src = link;
  popupBigPohotoImage.alt = name;
  popupBigPhotoDescription.textContent = name;
}
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
// лайк
function changeLikeButton(item) {
  item.classList.toggle("gallery__like-button_active");
}
// закрытие попапа по клику на оверлэй
function closePopupByClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

//                                                            -----СОБЫТИЯ-----
// Кнопка редактирования профиля
editProfileButton.addEventListener("click", function () {
  formInputUserName.value = userName.textContent;
  formInputUserProfession.value = userProfession.textContent;
  disableSubmitButton(
    popupEditProfile.querySelector(".popup__submit-button"),
    settings
  );
  Array.from(
    popupEditProfile.querySelectorAll(settings.inputErrorClass)
  ).forEach((errorMessage) =>
    hideInputError(errorMessage, settings.errorClass)
  );
  openPopup(popupEditProfile);
});
// кнопка добавления фото
addPhotoButton.addEventListener("click", function () {
  formAddPhoto.reset();
  disableSubmitButton(
    popupAddPhoto.querySelector(".popup__submit-button"),
    settings
  );
  Array.from(popupAddPhoto.querySelectorAll(settings.inputErrorClass)).forEach(
    (errorMessage) => hideInputError(errorMessage, settings.errorClass)
  );
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
