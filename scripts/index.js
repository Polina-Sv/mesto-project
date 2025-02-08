import initialCards from "./cards.js";

const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.card');
const cardContainer = document.querySelector('.places__list');

function createCard(item) {
  const cardElement = card.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;

  return cardElement;
}

initialCards.forEach(item => {
  const card = createCard(item);
  cardContainer.append(card);
})


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
