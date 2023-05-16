export default class Api {
  constructor(obj, { showErrFunc }) {
    this._showErrorMessasge = showErrFunc;
    this._baseUrl = obj.baseUrl;
    this._settingsObj = {};
    this._settingsObj.method = "GET";
    this._settingsObj.headers = obj.headers;
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._settingsObj).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        this._showErrorMessasge(`Ошибка: ${res.status}`);
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._settingsObj).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        this._showErrorMessasge(`Ошибка: ${res.status}`);
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
  setUserInfo(userData) {
    this._settingsObj.method = "PATCH";
    this._settingsObj.body = JSON.stringify({
      name: userData.name,
      about: userData.profession,
    });
    return fetch(`${this._baseUrl}/users/me`, this._settingsObj).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        this._showErrorMessasge(`Ошибка: ${res.status}`);
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
  postNewCard(newCard) {
    this._settingsObj.method = "POST";
    this._settingsObj.body = JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    });
    return fetch(`${this._baseUrl}/cards`, this._settingsObj).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        this._showErrorMessasge(`Ошибка: ${res.status}`);
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
  deleteCard(id) {
    console.log(id);
    this._settingsObj.method = "DELETE";
    fetch(`${this._baseUrl}/cards/${id}`, this._settingsObj).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        this._showErrorMessasge(`Ошибка: ${res.status}`);
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
  likesToggle(id, method) {
    this._settingsObj.method = method;
    return fetch(`${this._baseUrl}/cards/${id}/likes`, this._settingsObj).then(
      (res) => {
        if (res.ok) {
          return res.json();
        } else {
          this._showErrorMessasge(`Ошибка: ${res.status}`);
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      }
    );
  }
  patchAvatar(userData) {
    this._settingsObj.method = "PATCH";
    this._settingsObj.body = JSON.stringify({
      avatar: userData.url,
    });
    return fetch(`${this._baseUrl}/users/me/avatar`, this._settingsObj).then(
      (res) => {
        if (res.ok) {
          return res.json();
        } else {
          this._showErrorMessasge(`Ошибка: ${res.status}`);
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      }
    );
  }
}
