// нахожу попапы
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddPhoto = document.querySelector(".popup-add-photo");

// нахожу кнопки
const editProfileButton = document.querySelector(
  ".profile__edit-profile-button"
);
const addPhotoButton = document.querySelector(".profile__add-photo-button");

// нахожу кнопки закрытия попапов
const closePopupEditProfileButton = popupEditProfile.querySelector(
  ".popup__close-button"
);
const closePopupAddPhotoButton = popupAddPhoto.querySelector(
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
// закрытие попапа редактирования профиля
closePopupEditProfileButton.addEventListener("click", closePopupEditProfile);
formInputEditProfile.addEventListener("submit", handleFormSubmit);
// закрытие попапа добаления фотографий
closePopupAddPhotoButton.addEventListener("click", closepopupAddPhoto);
