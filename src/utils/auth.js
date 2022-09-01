export const BASE_URL = 'https://register.nomoreparties.co';

const checkResponse = (res) => {
  if (res.ok) { return res.json(); }
  return Promise.reject(`Error: ${res.statusText}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => checkResponse(res))

};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => checkResponse(res))
    .then((data) => {
      return data
    })
}

export const checkUserToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => checkResponse(res)
    )

}
