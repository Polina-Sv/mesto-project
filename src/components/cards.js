import {closeModal, openModal} from "./modal.js";
import { getInitialCards, addNewCard, deleteCardApi } from './api.js';

const cardsContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const addModal = document.querySelector('.popup_type_new-card');
const addForm = addModal.querySelector('.popup__form');
const placeNameInput = addForm.querySelector('.popup__input_type_card-name');
const linkInput = addForm.querySelector('.popup__input_type_url');

export function initCardAdding(userId) {
  addButton.addEventListener('click', () => {
    addForm.reset();
    openModal(addModal);
  });

  addForm.addEventListener('submit', (evt) => handleAddCardSubmit(evt, userId));
}

function handleAddCardSubmit(evt, userId) {
  evt.preventDefault();
  
  const submitButton = addForm.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Создание...';

  addNewCard(placeNameInput.value, linkInput.value)
    .then(newCard => {
      const cardElement = createCardElement(newCard, userId);
      cardsContainer.prepend(cardElement); 
      closeModal(addModal);
    })
    .catch(err => {
      console.error('Ошибка добавления карточки:', err);
    })
    .finally(() => {
      submitButton.textContent = initialText;
    });
}

export function loadAndRenderCards(userId) {
  return getInitialCards()
    .then(cards => {
      renderCards(cards, userId);
      return cards;
    })
    .catch(err => {
      console.error('Ошибка загрузки карточек:', err);
      throw err;
    });
}

function renderCards(cards, userId) {
  cardsContainer.innerHTML = '';
  cards.forEach(card => {
    const cardElement = createCardElement(card, userId);
    cardsContainer.append(cardElement);
  });
}

function createCardElement(cardData, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true).querySelector('.card');

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeCountElement = cardElement.querySelector('.card__like-count');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCountElement.textContent = cardData.likes.length;

  if (cardData.owner._id === userId) {
    deleteButton.style.display = 'block';
    deleteButton.addEventListener('click', () => handleDeleteCard(cardData._id, cardElement));
  } else {
    deleteButton.style.display = 'none';
  }

  return cardElement;
}

function handleDeleteCard(cardId, cardElement) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.error('Ошибка удаления карточки:', err);
    });
}
