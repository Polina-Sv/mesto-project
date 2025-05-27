const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/apf-cohort-202',
    headers: {
      authorization: 'cb3806cb-88d1-4e58-a11c-6bd5290ec712',
      'Content-Type': 'application/json',
    },
};
  
function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}
  
export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(checkResponse);
};

export const updateProfileInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ name, about })
    }).then(checkResponse);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    }).then(checkResponse);
  };

export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({ name, link })
    }).then(checkResponse);
};
  
export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    }).then(checkResponse);
};

export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    }).then(checkResponse);
  };
  
  export const unlikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    }).then(checkResponse);
  };
