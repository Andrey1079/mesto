// нахожу попапы
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddPhoto = document.querySelector(".popup-add-photo");
const popupBigPhoto = document.querySelector(".popup-big-photo");

// нахожу кнопки открытия попапов
const editProfileButton = document.querySelector(
  ".profile__edit-profile-button"
);
const addPhotoButton = document.querySelector(".profile__add-photo-button");

// нахожу карточки из галереи
const galleryItemsArr = document.querySelectorAll(".gallery__image");

// нахожу увеличенное фото в попапе
const popupBigPohotoImage = popupBigPhoto.querySelector(".popup__img");

// нахожу подпись к попапу
const popupBigPhotoDescription = popupBigPhoto.querySelector(
  ".popup__place-name-of-big-photo"
);

// нахожу кнопки закрытия попапов
const closePopupEditProfileButton = popupEditProfile.querySelector(
  ".popup__close-button"
);
const closePopupAddPhotoButton = popupAddPhoto.querySelector(
  ".popup__close-button"
);
const closePopupBigPhotoButton = popupBigPhoto.querySelector(
  ".popup__close-button"
);

// нахожу форму редактирования профиля
const formInputEditProfile = popupEditProfile.querySelector(".popup__form");
//нахожу поля ввода для имени и професии
const formInputUserName = formInputEditProfile.querySelector(
  ".popup__form-item_type_name"
);
const formInputUserProfession = formInputEditProfile.querySelector(
  ".popup__form-item_type_profession"
);
// нахожу элемент с текущим значением имени пользователя
const userName = document.querySelector(".profile__user-name");
// нахожу элемент с текущим значением профессии пользователя
const userProfession = document.querySelector(".profile__user-profession");

// нахожу форму добавления фотографий
const formInputAddPhoto = popupAddPhoto.querySelector(".popup__form");
//нахожу поля ввода названия места и ссылки
const formInputPlace = formInputAddPhoto.querySelector(
  ".popup__form-item_type_place"
);
const formInputPlaceLink = formInputAddPhoto.querySelector(
  ".popup__form-item_type_img-link"
);

//ФУНКЦИЯ открытие окна попапа для добавления фото
function addClassPopupVisibleForAddPhoto() {
  popupEditProfile.classList.add("popup_visible");
}

// ФУНКЦИЯ открытия большой фотографии
function openBigGalleryItem(evt) {
  popupBigPhoto.classList.add("popup_visible");
  const currentSrc = evt.target.getAttribute("src");
  const currentPhotoName = evt.target.getAttribute("alt");
  popupBigPohotoImage.src = currentSrc;
  popupBigPohotoImage.alt = currentPhotoName;
  popupBigPohotoImage.nextElementSibling.textContent =
    evt.target.nextElementSibling.textContent;
}

//ФУНКЦИЯ закрытия окна попапа редактирования профиля
function closePopupEditProfile() {
  popupEditProfile.classList.remove("popup_visible");
}
//ФУНКЦИЯ закрытия окна попапа добавления фотографий
function closepopupAddPhoto() {
  popupAddPhoto.classList.remove("popup_visible");
}
//ФУНКЦИЯ закрытия окна попапа с большой фотографией
function closePopupBigPhoto() {
  popupBigPhoto.classList.remove("popup_visible");
}

// ФУНКЦИЯ отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = formInputUserName.value;
  userProfession.textContent = formInputUserProfession.value;
  closePopup();
}

// навешиваю слушатели на кнопки
// редактирование профиля
editProfileButton.addEventListener("click", function () {
  formInputUserName.value = userName.textContent;
  formInputUserProfession.value = userProfession.textContent;
  popupEditProfile.classList.add("popup_visible");
});
// добавление фотографий
addPhotoButton.addEventListener("click", function () {
  popupAddPhoto.classList.add("popup_visible");
});
// открытие фото в большом размере
galleryItemsArr.forEach(function (item) {
  item.addEventListener("click", openBigGalleryItem);
});
// закрытие попапа редактирования профиля
closePopupEditProfileButton.addEventListener("click", closePopupEditProfile);
formInputEditProfile.addEventListener("submit", handleFormSubmit);
// закрытие попапа добаления фотографий
closePopupAddPhotoButton.addEventListener("click", closepopupAddPhoto);
// закрытие попапа большой фотографии
closePopupBigPhotoButton.addEventListener("click", closePopupBigPhoto);
