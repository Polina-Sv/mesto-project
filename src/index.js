import './pages/index.css';
import enableValidation from "./components/validate.js";
import {closeModal} from "./components/modal.js";
import { loadProfileData, initProfileEditing, initAvatarEditing } from './components/profile.js';
import { loadAndRenderCards, initCardAdding } from './components/cards.js';

function initApp() {
  loadProfileData()
    .then(userData => {
      loadAndRenderCards(userData._id);
      initProfileEditing();
      initCardAdding(userData._id);
      initAvatarEditing();
    })
    .catch(err => {
      console.error('Ошибка инициализации:', err);
    });
}

document.addEventListener('DOMContentLoaded', initApp);

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

const popupCloseBtns = document.querySelectorAll('.popup__close');
popupCloseBtns.forEach((button) => {
    button.addEventListener('click', evt => {
        closeModal(button.closest('.popup'));
    })
})

enableValidation();