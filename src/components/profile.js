import { getUserData } from './api.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

export function loadProfileData() {
  return getUserData()
    .then(userData => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      profileImage.onerror = () => {
        profileImage.style.backgroundImage = 'url(../images/default_avatar.jpg)';
      };
      return userData;
    })
    .catch(err => {
      console.error('Ошибка загрузки профиля:', err);
      throw err;
    });
}