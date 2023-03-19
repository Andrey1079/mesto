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

// карточки из галереи
// const galleryItemsArr = document.querySelectorAll(".gallery__image");

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

//ФУНКЦИИ

//ФУНКЦИЯ добавления мест из массива
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

//ФУНКЦИЯ добавления карточки галереи на страницу

function addNewPlace(evt) {
  evt.preventDefault();
  const newGalleryItem = {};
  newGalleryItem.name = formInputPlace.value;
  newGalleryItem.link = formInputPlaceLink.value;
  galleryArray.push(newGalleryItem);
  addPlaceFromArr(newGalleryItem);
  closepopupAddPhoto();
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
  popupBigPhoto.classList.add("popup_opacity_slow-grow");
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
  popupEditProfile.classList.add("popup_opacity_slow-damp");
  setTimeout(function () {
    popupEditProfile.classList.remove("popup_visible");
    popupEditProfile.classList.remove("popup_opacity_slow-damp");
    popupEditProfile.classList.remove("popup_opacity_slow-grow");
  }, 800);
}
//ФУНКЦИЯ закрытия окна попапа добавления фотографий
function closepopupAddPhoto() {
  popupAddPhoto.classList.add("popup_opacity_slow-damp");
  setTimeout(function () {
    popupAddPhoto.classList.remove("popup_visible");
    popupAddPhoto.classList.remove("popup_opacity_slow-damp");
    popupAddPhoto.classList.remove("popup_opacity_slow-grow");
  }, 800);
}
// ФУНКЦИЯ закрытия больш

// ФУНКЦИЯ отправки формы профиля юзера
function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = formInputUserName.value;
  userProfession.textContent = formInputUserProfession.value;
  closePopupEditProfile();
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
  popupEditProfile.classList.add("popup_opacity_slow-grow");
  popupEditProfile.classList.add("popup_visible");
});
// добавление фотографий
addPhotoButton.addEventListener("click", function () {
  popupAddPhoto.classList.add("popup_opacity_slow-grow");
  popupAddPhoto.classList.add("popup_visible");
});
formInputAddPhoto.addEventListener("submit", addNewPlace);
// открытие фото в большом размере

// закрытие попапа редактирования профиля
closePopupEditProfileButton.addEventListener("click", closePopupEditProfile);
formInputEditProfile.addEventListener("submit", handleFormSubmit);
// закрытие попапа добаления фотографий
closePopupAddPhotoButton.addEventListener("click", closepopupAddPhoto);
// закрытие попапа большой фотографии
closePopupBigPhotoButton.addEventListener("click", function () {
  popupBigPhoto.classList.add("popup_opacity_slow_damp");
  setTimeout(function () {
    popupBigPhoto.classList.remove("popup_visible");
    popupBigPhoto.classList.remove("popup_opacity_slow-damp");
    popupBigPhoto.classList.remove("popup_opacity_slow-grow");
  }, 800);
});
galleryArray.forEach(addPlaceFromArr);
