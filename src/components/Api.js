export default class Api {
  constructor(obj) {
    this.baseUrl = obj.baseUrl;
    this.headers = { headers: obj.headers };
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, this.headers).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
  getInitialCards() {}
  editProfile() {}
  postNewCard() {}
  getLikesQuantity() {}
  deleteCard() {}
  likeToggle() {}
  patchAvatar() {}
  getErrorMessasge() {}
}
