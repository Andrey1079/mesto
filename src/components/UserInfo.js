export default class UserInfo {
  constructor({ userDataSelectors }) {
    this._userNameField = document.querySelector(
      userDataSelectors.userNameSelector
    );
    this._userProfessionField = document.querySelector(
      userDataSelectors.userProfessionSelector
    );
    this._userAvatar = document.querySelector(
      userDataSelectors.userAvatarSelector
    );
    this.userId = "";
  }
  getUserInfo() {
    // возвращает объект с данными пользователя
    this._userDataForInputs = {};
    this._userDataForInputs.name = this._userNameField.textContent;
    this._userDataForInputs.profession = this._userProfessionField.textContent;
    return this._userDataForInputs;
  }

  setUserInfo(userData) {
    this.userId = userData._id;
    this._userNameField.textContent = userData.name;
    this._userProfessionField.textContent = userData.about;
  }
  setAvatar(userData) {
    this._userAvatar.style.backgroundImage = `url(${userData.avatar})`;
  }
  getUserId() {
    return this.userId;
  }
}
