import {initialCards, createCard} from "./components/cards.js";
import enableValidation from "./components/validate.js";
import {closeModal, openModal} from "./components/modal.js";
import './pages/index.css';

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const cardContainer = document.querySelector('.places__list');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');


initialCards.forEach(item => {
    const card = createCard(item);
    cardContainer.append(card);
})

const popupCloseBtns = document.querySelectorAll('.popup__close');
popupCloseBtns.forEach((button) => {
    button.addEventListener('click', evt => {
        closeModal(button.closest('.popup'));
    })
})

const inputName = profilePopup.querySelector('.popup__input_type_name');
const inputDesc = profilePopup.querySelector('.popup__input_type_description');
const profileForm = document.forms['edit-profile'];
const profileEditBtn = document.querySelector('.profile__edit-button');

profileEditBtn.addEventListener('click', evt => {
    inputName.value = document.querySelector('.profile__title').textContent;
    inputDesc.value = document.querySelector('.profile__description').textContent;
    openModal(profilePopup);
});

profileForm.addEventListener('submit', evt => {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = inputName.value;
    document.querySelector('.profile__description').textContent = inputDesc.value;
    closeModal(profilePopup);
}); 

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