import './pages/index.css';
import enableValidation from "./components/validate.js";
import {closeModal, openModal} from "./components/modal.js";
import { loadProfileData, initProfileEditing } from './components/profile.js';
import { loadAndRenderCards } from './components/cards.js';

function initApp() {
  loadProfileData()
    .then(userData => {
      return loadAndRenderCards(userData._id);
    })
    .then(() => {
      initProfileEditing();
    })
    .catch(err => {
      console.error('Ошибка инициализации:', err);
    });
}

document.addEventListener('DOMContentLoaded', initApp);

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const cardContainer = document.querySelector('.places__list');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

const popupCloseBtns = document.querySelectorAll('.popup__close');
popupCloseBtns.forEach((button) => {
    button.addEventListener('click', evt => {
        closeModal(button.closest('.popup'));
    })
})


const cardAddBtn = document.querySelector('.profile__add-button');
cardAddBtn.addEventListener('click', evt => {
    openModal(cardPopup);
});

const inputCardName = cardPopup.querySelector('.popup__input_type_card-name');
const inputUrl = cardPopup.querySelector('.popup__input_type_url');
const cardForm = document.forms['new-place'];

cardForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const info = {
        name: inputCardName.value,
        link: inputUrl.value,
    }
    const card = createCard(info);
    cardContainer.prepend(card);
    closeModal(cardPopup);
});

enableValidation();