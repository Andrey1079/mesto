//                                                            -----ОБЪЯВДЕНИЕ ПЕРЕМЕННЫХ-----
const allClosePopupButtons = document.querySelectorAll(".popup__close-button");
//---Редактирование профиля---
const popupEditProfile = document.querySelector(".popup-edit-profile");

const editProfileButton = document.querySelector(
  ".profile__edit-profile-button"
);
const formInputEditProfile = popupEditProfile.querySelector(".popup__form");
const formInputUserName = formInputEditProfile.querySelector(
  ".popup__form-item_type_name"
);
const formInputUserProfession = formInputEditProfile.querySelector(
  ".popup__form-item_type_profession"
);
const userName = document.querySelector(".profile__user-name");
const userProfession = document.querySelector(".profile__user-profession");

//---Галерея---
const popupAddPhoto = document.querySelector(".popup-add-photo");
const galleryItemTemplate = document.querySelector(
  ".gallery-item-template"
).content;
const galleryContainer = document.querySelector(".gallery__list");
const addPhotoButton = document.querySelector(".profile__add-photo-button");
const formInputAddPhoto = popupAddPhoto.querySelector(".popup__form");
const formInputPlace = formInputAddPhoto.querySelector(
  ".popup__form-item_type_place"
);
const formInputPlaceLink = formInputAddPhoto.querySelector(
  ".popup__form-item_type_img-link"
);
const popupBigPhoto = document.querySelector(".popup-big-photo"); //попап с увеличенной фотографией
const popupBigPohotoImage = popupBigPhoto.querySelector(".popup__img"); //увеличенная фотография в поппапе
const popupBigPhotoDescription = popupBigPhoto.querySelector(
  ".popup__place-name-of-big-photo"
);

//                                                            -----ФУНКЦИИ-----

function renderCard(item) {
  const galleryElement = galleryItemTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);
  const galeryImage = galleryElement.querySelector(".gallery__image");
  const galeryCaption = galleryElement.querySelector(".gallery__city");
  galeryImage.src = item.link;
  galeryImage.alt = item.name;
  galeryCaption.textContent = item.name;
  return galleryElement;
}
function addNewGalleryCard(item) {
  galleryContainer.prepend(renderCard(item));
}
galleryArray.forEach(addNewGalleryCard);

function addNewPlace(evt) {
  const newGalleryItem = {};
  newGalleryItem.name = formInputPlace.value;
  newGalleryItem.link = formInputPlaceLink.value;
  addNewGalleryCard(newGalleryItem);
  closePopup(popupAddPhoto);
  formInputAddPhoto.reset();
}
function deleteGalleryItem(item) {
  item.remove();
}
function openBigGalleryItem(link, name) {
  openPopup(popupBigPhoto);
  popupBigPohotoImage.src = link;
  popupBigPohotoImage.alt = name;
  popupBigPhotoDescription.textContent = name;
}
function openPopup(item) {
  item.classList.add("popup_visible");
  item.addEventListener("click", closePopupByClickOverlay);
  document.addEventListener("keydown", checkPushEscape, item);
  enableValidation(settings);
}
function checkPushEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_visible"));
  }
}
function closePopup(item) {
  item.classList.remove("popup_visible");
  item.removeEventListener("click", closePopupByClickOverlay);
  document.removeEventListener("keydown", checkPushEscape);
}
function editProfile(evt) {
  userName.textContent = formInputUserName.value;
  userProfession.textContent = formInputUserProfession.value;
  closePopup(popupEditProfile);
}
function changeLikeButton(item) {
  item.classList.toggle("gallery__like-button_active");
}
function closePopupByClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

//                                                            -----СОБЫТИЯ-----

editProfileButton.addEventListener("click", function () {
  formInputUserName.value = userName.textContent;
  formInputUserProfession.value = userProfession.textContent;
  openPopup(popupEditProfile);
});

addPhotoButton.addEventListener("click", function () {
  openPopup(popupAddPhoto);
});
formInputEditProfile.addEventListener("submit", editProfile);
formInputAddPhoto.addEventListener("submit", addNewPlace);
allClosePopupButtons.forEach((button) => {
  const buttonsPopup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(buttonsPopup));
});
galleryContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("gallery__like-button")) {
    changeLikeButton(evt.target);
  }
  if (evt.target.classList.contains("gallery__bin-button")) {
    deleteGalleryItem(evt.target.closest(".gallery__item"));
  }
  if (evt.target.classList.contains("gallery__image")) {
    const link = evt.target.src;
    const capture = evt.target.alt;

    openBigGalleryItem(link, capture);
  }
});
//                                                            -----ФОРМИРОВАНИЕ ГАЛЕРЕИ ИЗ МАССИВА-----
