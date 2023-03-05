// нахожу элемент с кнопками закрыть и сохранить
let popupElement = document.querySelector(".popup");

// нахожу кнопку редактирования профиля
let editProfileButton = document.querySelector(".profile__edit-profile-button");

// нахожу кнопку закрытия попапа без сохранения
let closePopupWindowButton = popupElement.querySelector(".popup__close-button");

// нахожу кнопку сохранения изменений в профиле
let saveUserNameAndProfessionButton = popupElement.querySelector(
  ".popup__submit-button"
);

// нахожу поле ввода именем пользователя
let userNameInput = popupElement.querySelector(".popup__user-name");
// нахожу элемент с текущим значением имени пользователя
let userName = document.querySelector(".profile__user-name");

// нахожу поле ввода профессии пользователя
let userProfessionInput = popupElement.querySelector(".popup__user-profession");
// нахожу элемент с текущим значением профессии пользователя
let userProfession = document.querySelector(".profile__user-profession");

//ФУНКЦИЯ открытие окна попапа и задание значений для полей
function addClassPopupVisible() {
  userNameInput.setAttribute("value", userName.textContent);
  userProfessionInput.setAttribute("value", userProfession.textContent);
  popupElement.classList.add("popup_visible");
}
console.log(document.querySelector(".profile__user-name").textContent);
//ФУНКЦИЯ закрытия окна попапа
function closePopup() {
  popupElement.classList.remove("popup_visible");
}

// ФУНКЦИЯ сохранения новых значений в форме
function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userProfession.textContent = userProfessionInput.value;
  closePopup();
}

// навешиваю слушатели на кнопки
// редактирование профиля
editProfileButton.addEventListener("click", addClassPopupVisible);
// закрытие попапа
closePopupWindowButton.addEventListener("click", closePopup);
// сохранение формы
saveUserNameAndProfessionButton.addEventListener("click", handleFormSubmit);
