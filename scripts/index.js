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

 const profilePopup = document.querySelector('.popup_type_edit');
 const cardPopup = document.querySelector('.popup_type_new-card');
 const imagePopup = document.querySelector('.popup_type_image');

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}


const profileEditBtn = document.querySelector('.profile__edit-button');
profileEditBtn.addEventListener('click', evt => {
    inputName.value = document.querySelector('.profile__title').textContent;
    inputDesc.value = document.querySelector('.profile__description').textContent;
    openModal(profilePopup);
})

const inputName = profilePopup.querySelector('.popup__input_type_name');
const inputDesc = profilePopup.querySelector('.popup__input_type_description');
const profileForm = document.forms['edit-profile'];

profileForm.addEventListener('submit', evt => {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = inputName.value;
    document.querySelector('.profile__description').textContent = inputDesc.value;
    closeModal(profilePopup);
}); 

const profilePopupCloseBtn = profilePopup.querySelector('.popup__close');
profilePopupCloseBtn.addEventListener('click', evt => {
    closeModal(profilePopup);
})


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
