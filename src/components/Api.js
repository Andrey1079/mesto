export default class Api {
  constructor(obj) {
    this._baseUrl = obj.baseUrl;
    this._settingsObj = {};
    this._settingsObj.method = "GET";
    this._settingsObj.headers = obj.headers;
  }

  getStartInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._settingsObj).then((res) => {
      return this._checkResponse(res);
    });
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._settingsObj).then((res) => {
      return this._checkResponse(res);
    });
  }
  setUserInfo(userData) {
    this._settingsObj.method = "PATCH";
    this._settingsObj.body = JSON.stringify({
      name: userData.name,
      about: userData.profession,
    });
    return fetch(`${this._baseUrl}/users/me`, this._settingsObj).then((res) => {
      return this._checkResponse(res);
    });
  }
  postNewCard(newCard) {
    this._settingsObj.method = "POST";
    this._settingsObj.body = JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    });
    return fetch(`${this._baseUrl}/cards`, this._settingsObj).then((res) => {
      return this._checkResponse(res);
    });
  }
  deleteCard(id) {
    this._settingsObj.method = "DELETE";
    return fetch(`${this._baseUrl}/cards/${id}`, this._settingsObj).then(
      (res) => {
        return this._checkResponse(res);
      }
    );
  }
  likesToggle(id, method) {
    this._settingsObj.method = method;
    return fetch(`${this._baseUrl}/cards/${id}/likes`, this._settingsObj).then(
      (res) => {
        return this._checkResponse(res);
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
        return this._checkResponse(res);
      }
    );
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}
