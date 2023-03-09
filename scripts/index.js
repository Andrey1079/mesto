// нахожу popup
let popupElement = document.querySelector(".popup");

// нахожу кнопку редактирования профиля
let editProfileButton = document.querySelector(".profile__edit-profile-button");

// нахожу кнопку закрытия попапа без сохранения
let closePopupWindowButton = popupElement.querySelector(".popup__close-button");

// нахожу поле ввода
let formInput = popupElement.querySelector(".popup__form");

// нахожу элемент с текущим значением имени пользователя
let userName = document.querySelector(".profile__user-name");

// нахожу элемент с текущим значением профессии пользователя
let userProfession = document.querySelector(".profile__user-profession");

//ФУНКЦИЯ открытие окна попапа и задание значений для полей
function addClassPopupVisible() {
  formInput.querySelector(".popup__form-item_type_name").value = "";
  formInput.querySelector(".popup__form-item_type_profession").value = "";

  formInput
    .querySelector(".popup__form-item_type_name")
    .setAttribute("placeholder", userName.textContent);
  formInput
    .querySelector(".popup__form-item_type_profession")
    .setAttribute("placeholder", userProfession.textContent);
  popupElement.classList.add("popup_visible");
}

//ФУНКЦИЯ закрытия окна попапа
function closePopup() {
  popupElement.classList.remove("popup_visible");
}

// ФУНКЦИЯ отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = formInput.querySelector(
    ".popup__form-item_type_name"
  ).value;
  userProfession.textContent = formInput.querySelector(
    ".popup__form-item_type_profession"
  ).value;
  closePopup();
}

// навешиваю слушатели на кнопки
// редактирование профиля
editProfileButton.addEventListener("click", addClassPopupVisible);
// закрытие попапа
closePopupWindowButton.addEventListener("click", closePopup);
formInput.addEventListener("submit", handleFormSubmit);
