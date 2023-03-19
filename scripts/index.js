// ОБЪЯВДЕНИЕ ПЕРЕМЕННЫХ
// массив с картинками для галереи
const galleryArray = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// ТЕМПЛЕЙТЫ
const galleryItemTemplate = document.querySelector(
  ".gallery-item-template"
).content;
const galleryList = document.querySelector(".gallery__list");
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

// увеличенное фото в попапе
const popupBigPohotoImage = popupBigPhoto.querySelector(".popup__img");
// подпись к увлеличенной фотографии попапа
const popupBigPhotoDescription = popupBigPhoto.querySelector(
  ".popup__place-name-of-big-photo"
);
// ПОЛЯ ФОРМ
// профиль
const formInputEditProfile = popupEditProfile.querySelector(".popup__form");
const formInputUserName = formInputEditProfile.querySelector(
  ".popup__form-item_type_name"
);
const formInputUserProfession = formInputEditProfile.querySelector(
  ".popup__form-item_type_profession"
);
// добавление фотографий
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

//ФУНКЦИЯ создания карточки
function addPlaceFromArr(item) {
  const galleryElement = galleryItemTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);
  galleryElement.querySelector(".gallery__image").src = item.link;
  galleryElement.querySelector(".gallery__image").alt = item.name;
  galleryElement.querySelector(".gallery__city").textContent = item.name;
  galleryList.prepend(galleryElement);
  galleryElement
    .querySelector(".gallery__image")
    .addEventListener("click", openBigGalleryItem);
  galleryElement
    .querySelector(".gallery__like-button")
    .addEventListener("click", changeLikeButton);
  galleryElement
    .querySelector(".gallery__bin-button")
    .addEventListener("click", deleteGalleryItem);
}

// создание карточек из массива
galleryArray.forEach(addPlaceFromArr);

//ФУНКЦИЯ добавления нового места в галереи
function addNewPlace(evt) {
  evt.preventDefault();
  const newGalleryItem = {};
  newGalleryItem.name = formInputPlace.value;
  newGalleryItem.link = formInputPlaceLink.value;
  galleryArray.push(newGalleryItem);
  addPlaceFromArr(newGalleryItem);
  closePopupSlowly(popupAddPhoto);
  formInputPlace.value = "";
  formInputPlaceLink.value = "";
}

// ФУНКЦИЯ удаления места из галлереи
function deleteGalleryItem(evt) {
  const deletedGalleryItem = evt.target.closest(".gallery__item");
  deletedGalleryItem.remove();
}

// ФУНКЦИЯ открытия большой фотографии
function openBigGalleryItem(evt) {
  openPopupSlowly(popupBigPhoto);
  popupBigPohotoImage.src = evt.target.getAttribute("src");
  popupBigPohotoImage.alt = evt.target.getAttribute("alt");
  popupBigPohotoImage.nextElementSibling.textContent =
    evt.target.nextElementSibling.textContent;
}

//ФКНКЦИЯ медленного открытия
function openPopupSlowly(item) {
  item.classList.add("popup_opacity_slow-grow");
  item.classList.add("popup_visible");
  setTimeout(function () {
    item.classList.remove("popup_opacity_slow-grow");
  }, 1000);
}

// ФУНКЦИЯ медленного закрытия
function closePopupSlowly(item) {
  item.classList.add("popup_opacity_slow-damp");
  setTimeout(function () {
    item.classList.remove("popup_visible");
    item.classList.remove("popup_opacity_slow-damp");
  }, 800);
}

// ФУНКЦИЯ отправки формы профиля юзера
function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = formInputUserName.value;
  userProfession.textContent = formInputUserProfession.value;
  closePopupSlowly(popupEditProfile);
}

// ФУНКЦИЯ установки лайка
function changeLikeButton(evt) {
  evt.target.classList.toggle("gallery__like-button_active");
}

// слушатели
// редактирование профиля
editProfileButton.addEventListener("click", function () {
  formInputUserName.value = userName.textContent;
  formInputUserProfession.value = userProfession.textContent;
  openPopupSlowly(popupEditProfile);
});
// добавление фотографий
addPhotoButton.addEventListener("click", function () {
  openPopupSlowly(popupAddPhoto);
});
formInputAddPhoto.addEventListener("submit", addNewPlace);

// закрытие попапа редактирования профиля
closePopupEditProfileButton.addEventListener("click", function () {
  closePopupSlowly(popupEditProfile);
});
formInputEditProfile.addEventListener("submit", handleFormSubmit);
// закрытие попапа добаления фотографий
closePopupAddPhotoButton.addEventListener("click", function () {
  closePopupSlowly(popupAddPhoto);
});
// закрытие попапа большой фотографии
closePopupBigPhotoButton.addEventListener("click", function () {
  closePopupSlowly(popupBigPhoto);
});
