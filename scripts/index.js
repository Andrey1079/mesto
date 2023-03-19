// ОБЪЯВДЕНИЕ ПЕРЕМЕННЫХ
// массив с картинками для галереи

// ТЕМПЛЕЙТЫ
const galleryItemTemplate = document.querySelector(
  ".gallery-item-template"
).content;
const galleryContainer = document.querySelector(".gallery__list");
// попапы
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddPhoto = document.querySelector(".popup-add-photo");
const popupBigPhoto = document.querySelector(".popup-big-photo");
// КНОПКИ
const editProfileButton = document.querySelector(
  ".profile__edit-profile-button"
);

document.querySelectorAll(".popup__close-button").forEach((button) => {
  const buttonsPopup = button.closest(".popup");
  button.addEventListener("click", () => closePopupSlowly(buttonsPopup));
});

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
function renderCard(item) {
  const galleryElement = galleryItemTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);
  const galeryImage = galleryElement.querySelector(".gallery__image");
  const galeryCaption = galleryElement.querySelector(".gallery__city");
  galeryImage.src = item.link;
  galeryImage.alt = item.name;
  galeryCaption.textContent = item.name;
  galeryImage.addEventListener("click", () =>
    openBigGalleryItem(item.link, item.name)
  );
  galleryElement
    .querySelector(".gallery__like-button")
    .addEventListener("click", changeLikeButton);
  galleryElement
    .querySelector(".gallery__bin-button")
    .addEventListener("click", deleteGalleryItem);
  return galleryElement;
}

// ФУНКЦИЯ добавления карточек в галерею
function addNewGalleryCard(item) {
  galleryContainer.prepend(renderCard(item));
}

// создание карточек из массива
galleryArray.forEach(addNewGalleryCard);

//ФУНКЦИЯ добавления нового места в галереи
function addNewPlace(evt) {
  evt.preventDefault();
  const newGalleryItem = {};
  newGalleryItem.name = formInputPlace.value;
  newGalleryItem.link = formInputPlaceLink.value;
  addNewGalleryCard(newGalleryItem);
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
function openBigGalleryItem(link, name) {
  openPopupSlowly(popupBigPhoto);
  popupBigPohotoImage.src = link;
  popupBigPohotoImage.alt = name;
  popupBigPhotoDescription.textContent = name;
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
