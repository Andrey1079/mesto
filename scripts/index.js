// ОБЪЯВДЕНИЕ ПЕРЕМЕННЫХ

// попапы
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddPhoto = document.querySelector(".popup-add-photo");
const popupBigPhoto = document.querySelector(".popup-big-photo");
// КНОПКИ
const editProfileButton = document.querySelector(
  ".profile__edit-profile-button"
);
const closePopupEditProfileButton = popupEditProfile.querySelector(
  ".popup__close-button"
);
const closePopupAddPhotoButton = popupAddPhoto.querySelector(
  ".popup__close-button"
);
const closePopupBigPhotoButton = popupBigPhoto.querySelector(
  ".popup__close-button"
);
const addPhotoButton = document.querySelector(".profile__add-photo-button");

// карточки из галереи
const galleryItemsArr = document.querySelectorAll(".gallery__image");
// увеличенное фото в попапе
const popupBigPohotoImage = popupBigPhoto.querySelector(".popup__img");
// подпись к увлеличенной фотографии попапа
const popupBigPhotoDescription = popupBigPhoto.querySelector(
  ".popup__place-name-of-big-photo"
);
// ПОЛЯ ФОРМ
const formInputEditProfile = popupEditProfile.querySelector(".popup__form");

const formInputUserName = formInputEditProfile.querySelector(
  ".popup__form-item_type_name"
);
const formInputUserProfession = formInputEditProfile.querySelector(
  ".popup__form-item_type_profession"
);
const formInputAddPhoto = popupAddPhoto.querySelector(".popup__form");
const formInputPlace = formInputAddPhoto.querySelector(
  ".popup__form-item_type_place"
);
const formInputPlaceLink = formInputAddPhoto.querySelector(
  ".popup__form-item_type_img-link"
);

// ЗНАЧЕНИЯ ИЗ HTML
//значение имени пользователя
const userName = document.querySelector(".profile__user-name");
//значение профессии пользователя
const userProfession = document.querySelector(".profile__user-profession");

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

// ФУНКЦИЯ отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = formInputUserName.value;
  userProfession.textContent = formInputUserProfession.value;
  closePopupEditProfile();
}

// слушатели
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
closePopupBigPhotoButton.addEventListener("click", function () {
  popupBigPhoto.classList.remove("popup_visible");
});
