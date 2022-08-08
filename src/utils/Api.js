export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) { return res.json(); }
    return Promise.reject(`Error: ${res.statusText}`);
  };


  // fetch data about the user from server
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(res => this._checkResponse(res));
  }

  getUserAvatar() {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
    }).then(res => this._checkResponse(res));
  }

  // fetch cards from the server
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(res => this._checkResponse(res));
  }

  // edit and update the profile info
  updateUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(res => this._checkResponse(res));
  }

  // add new card to server
  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(res => this._checkResponse(res));
  }

  //update profile picture
  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    }).then(res => this._checkResponse(res));
  }


  //Delete card from server
  deleteCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    }).then(res => this._checkResponse(res));
  }

  // Add and Remove Likes
  updateLike(LikeButtonIsActive, cardId) {
    if (LikeButtonIsActive) {
      //unlike
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers
      })
        .then(res => this._checkResponse(res));
    }
    else {
      //like 
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers
      })
        .then(res => this._checkResponse(res));
    }
  }

}
