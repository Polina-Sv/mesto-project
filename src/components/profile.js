import { getUserData, updateProfileInfo, updateAvatar } from './api.js';
import {closeModal, openModal} from "./modal.js";
import { hideInputError } from './validate.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const avatarEditButton = document.createElement('div');
avatarEditButton.classList.add('profile__image_edit');
profileImage.prepend(avatarEditButton);
const editButton = document.querySelector('.profile__edit-button');
const editModal = document.querySelector('.popup_type_edit');
editModal.classList.add('popup_is-animated');
const editForm = editModal.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const aboutInput = editForm.querySelector('.popup__input_type_description');
const avatarModal = document.querySelector('.popup_type_avatar');
avatarModal.classList.add('popup_is-animated');
const avatarForm = avatarModal.querySelector('.popup__form');
const avatarUrlInput = avatarForm.querySelector('.popup__input_type_url');

export function loadProfileData() {
  return getUserData()
    .then(userData => {
      updateProfileUI(userData);
      return userData;
    })
    .catch(err => {
      console.error('Ошибка загрузки профиля:', err);
      throw err;
    });
}

function updateProfileUI(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
  profileImage.onerror = () => {
    profileImage.style.backgroundImage = 'url(../images/default_avatar.jpg)';
  };
}

export function initProfileEditing() {
  editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileDescription.textContent;
    hideInputError(editForm, nameInput);
    hideInputError(editForm, aboutInput);
    openModal(editModal);
  });

  editForm.addEventListener('submit', handleProfileFormSubmit);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  
  const submitButton = editForm.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  updateProfileInfo(nameInput.value, aboutInput.value)
    .then(userData => {
      updateProfileUI(userData);
      closeModal(editModal);
    })
    .catch(err => {
      console.error('Ошибка обновления профиля:', err);
    })
    .finally(() => {
      submitButton.textContent = initialText;
      hideInputError(editForm, nameInput);
      hideInputError(editForm, aboutInput);
    });
}

export function initAvatarEditing() {
  avatarEditButton.addEventListener('click', () => {
    avatarForm.reset();
    hideInputError(avatarForm, avatarUrlInput);
    openModal(avatarModal);
  });
  avatarForm.addEventListener('submit', handleAvatarFormSubmit);
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  
  const submitButton = avatarForm.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  updateAvatar(avatarUrlInput.value)
    .then(userData => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarModal);
    })
    .catch(err => {
      console.error('Ошибка обновления аватара:', err);
    })
    .finally(() => {
      submitButton.textContent = initialText;
      hideInputError(avatarForm, avatarUrlInput);
    });
}
