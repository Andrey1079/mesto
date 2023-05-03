export default class UserInfo {
  constructor({ userData }) {
    this._userNameField = document.querySelector(userData.userNameSelector);
    this._userProfessionField = document.querySelector(
      userData.userProfessionSelector
    );
  }
  getUserInfo() {
    // возвращает объект с данными пользователя

    this._userData = {};
    this._userData.name = this._userNameField.textContent;
    this._userData.profession = this._userProfessionField.textContent;
    return this._userData;
  }

  setUserInfo(userData) {
    this._userNameField.textContent = userData.name;
    this._userProfessionField.textContent = userData.profession;
  }
}
