// нахожу popup
let popupElement = document.querySelector(".popup");

// нахожу кнопку редактирования профиля
let editProfileButton = document.querySelector(".profile__edit-profile-button");

// нахожу кнопку закрытия попапа без сохранения
let closePopupWindowButton = popupElement.querySelector(".popup__close-button");

// нахожу форму
let formInput = popupElement.querySelector(".popup__form");

//нахожу поля ввода для имени и професии
let formInputUserName = formInput.querySelector(".popup__form-item_type_name");
let formInputUserProfession = formInput.querySelector(
  ".popup__form-item_type_profession"
);

// нахожу элемент с текущим значением имени пользователя
let userName = document.querySelector(".profile__user-name");

// нахожу элемент с текущим значением профессии пользователя
let userProfession = document.querySelector(".profile__user-profession");

//ФУНКЦИЯ открытие окна попапа и задание значений для полей
function addClassPopupVisible() {
  formInputUserName.setAttribute("value", userName.textContent);
  formInputUserProfession.setAttribute("value", userProfession.textContent);
  popupElement.classList.add("popup_visible");
}

//ФУНКЦИЯ закрытия окна попапа
function closePopup() {
  popupElement.classList.remove("popup_visible");
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
editProfileButton.addEventListener("click", addClassPopupVisible);
// закрытие попапа
closePopupWindowButton.addEventListener("click", closePopup);
formInput.addEventListener("submit", handleFormSubmit);
