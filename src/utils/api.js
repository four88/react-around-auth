class Api {
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
      headers: this._headers, method: "PATCH",
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
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: isLiked ? "DELETE" : "PUT",
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
  }
}


const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b8628092-ca99-4978-bdb3-720edea9284d",
    "Content-Type": "application/json",
  }
});


export default api
