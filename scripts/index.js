//                                                            -----ОБЪЯВДЕНИЕ ПЕРЕМЕННЫХ-----

//---Редактирование профиля---
const popupEditProfile = document.querySelector(".popup-edit-profile"); //попап редактирования профиля
const editProfileButton = document.querySelector(
  //кнопка редактирования профиля
  ".profile__edit-profile-button"
);
const formInputEditProfile = popupEditProfile.querySelector(".popup__form"); //форма редактирования профиля
const formInputUserName = formInputEditProfile.querySelector(
  ".popup__form-item_type_name"
); //поле ввода имени пользователя
const formInputUserProfession = formInputEditProfile.querySelector(
  ".popup__form-item_type_profession"
); //поле ввода профессии пользователя
const userName = document.querySelector(".profile__user-name"); //значение имени пользователя
const userProfession = document.querySelector(".profile__user-profession"); //значение профессии пользователя

//---Галерея---
const popupAddPhoto = document.querySelector(".popup-add-photo"); //попап добавления карточки в галерею
const galleryItemTemplate = document.querySelector(
  ".gallery-item-template"
).content; //темплейт
const galleryContainer = document.querySelector(".gallery__list"); //галерея
const addPhotoButton = document.querySelector(".profile__add-photo-button"); //кнопка добавления фотографий
const formInputAddPhoto = popupAddPhoto.querySelector(".popup__form"); //форма добавления новой карточки в галерею
const formInputPlace = formInputAddPhoto.querySelector(
  ".popup__form-item_type_place"
); //поле ввода названия места
const formInputPlaceLink = formInputAddPhoto.querySelector(
  ".popup__form-item_type_img-link"
); //поле ввода ссылки на фотографию

//---Попап с увеличенной фотографией---
const popupBigPhoto = document.querySelector(".popup-big-photo"); //попап с увеличенной фотографией
const popupBigPohotoImage = popupBigPhoto.querySelector(".popup__img"); //увеличенная фотография в поппапе
const popupBigPhotoDescription = popupBigPhoto.querySelector(
  ".popup__place-name-of-big-photo"
); //подпись к увеличенной фотографии в попапе

//                                                            -----ФУНКЦИИ-----
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
//ФУНКЦИЯ cоздания объекта галереи
function addNewPlace(evt) {
  evt.preventDefault();
  const newGalleryItem = {};
  newGalleryItem.name = formInputPlace.value;
  newGalleryItem.link = formInputPlaceLink.value;
  addNewGalleryCard(newGalleryItem);
  closePopup(popupAddPhoto);
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
  openPopup(popupBigPhoto);
  popupBigPohotoImage.src = link;
  popupBigPohotoImage.alt = name;
  popupBigPhotoDescription.textContent = name;
}

//ФКНКЦИЯ медленного открытия
function openPopup(item) {
  item.classList.add("popup_visible");
}

// ФУНКЦИЯ медленного закрытия
function closePopup(item) {
  item.classList.remove("popup_visible");
}

// ФУНКЦИЯ отправки формы профиля юзера
function editProfile(evt) {
  evt.preventDefault();
  userName.textContent = formInputUserName.value;
  userProfession.textContent = formInputUserProfession.value;
  closePopup(popupEditProfile);
}

// ФУНКЦИЯ установки лайка
function changeLikeButton(evt) {
  evt.target.classList.toggle("gallery__like-button_active");
}
//                                                            -----СОБЫТИЯ-----

editProfileButton.addEventListener("click", function () {
  formInputUserName.value = userName.textContent;
  formInputUserProfession.value = userProfession.textContent;
  openPopup(popupEditProfile);
}); // слушает нажатие кнопки редактирования профиля и заполняет значения формы ввода

addPhotoButton.addEventListener("click", function () {
  openPopup(popupAddPhoto);
}); // слушает нажатие кнопки добавления фотографии и открывает попап добавления фотографии
formInputEditProfile.addEventListener("submit", editProfile); //слушает нажатие кнопки добавить фото и добавляет фото в галерею
formInputAddPhoto.addEventListener("submit", addNewPlace); //слушает нажатие кнопки добавить фото и добавляет фото в галерею
document.querySelectorAll(".popup__close-button").forEach((button) => {
  const buttonsPopup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(buttonsPopup));
}); //перебирает все кнопки закрытия попапов и навешивает на них слушатели

//                                                            -----ФОРМИРОВАНИЕ ГАЛЕРЕИ ИЗ МАССИВА-----
galleryArray.forEach(addNewGalleryCard);
