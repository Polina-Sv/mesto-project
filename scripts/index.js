import initialCards from "./cards.js";

const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.card');
const cardContainer = document.querySelector('.places__list');

function createCard(item) {
  const cardElement = card.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like-button_is-active');
  });
  cardElement.querySelector('.card__delete-button').addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

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

//---------------------------------------

const profileEditBtn = document.querySelector('.profile__edit-button');
profileEditBtn.addEventListener('click', evt => {
    inputName.value = document.querySelector('.profile__title').textContent;
    inputDesc.value = document.querySelector('.profile__description').textContent;
    openModal(profilePopup);
});

const profilePopupCloseBtn = profilePopup.querySelector('.popup__close');
profilePopupCloseBtn.addEventListener('click', evt => {
    closeModal(profilePopup);
});

const inputName = profilePopup.querySelector('.popup__input_type_name');
const inputDesc = profilePopup.querySelector('.popup__input_type_description');
const profileForm = document.forms['edit-profile'];

profileForm.addEventListener('submit', evt => {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = inputName.value;
    document.querySelector('.profile__description').textContent = inputDesc.value;
    closeModal(profilePopup);
}); 

//---------------------------------------

const cardAddBtn = document.querySelector('.profile__add-button');
cardAddBtn.addEventListener('click', evt => {
    openModal(cardPopup);
});

const cardPopupCloseBtn = cardPopup.querySelector('.popup__close');
cardPopupCloseBtn.addEventListener('click', evt => {
    closeModal(cardPopup);
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
