export default class UserInfo {
  constructor({ userData }) {
    this._userNameField = document.querySelector("data.userNameSelector");
    this._userProffessionField = document.querySelector(
      "data.userProffessionSelector"
    );
  }
  getUserInfo() {
    // возвращает объект с данными пользователя
  }
  setUserInfo() {
    // принимает объект с данными о пользователе и добавляет их в разметку
  }
}
