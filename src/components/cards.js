import { openModal } from "./modal.js";
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.card');
const imagePopup = document.querySelector('.popup_type_image');

function createCard(item) {
  const cardElement = card.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').addEventListener('click', evt => {
    imagePopup.querySelector('.popup__image').src = item.link;
    imagePopup.querySelector('.popup__caption').textContent = item.name;
    openModal(imagePopup);
  });
  cardElement.querySelector('.card__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like-button_is-active');
  });
  cardElement.querySelector('.card__delete-button').addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  return cardElement;
}
export { initialCards, createCard };
