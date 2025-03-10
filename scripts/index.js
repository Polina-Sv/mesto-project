import initialCards from "./cards.js";

const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.card');
const cardContainer = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

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

const closePopupOverlay = (evt) => {
    const isClosest = evt.target.closest('.popup__content');
    const isPopupOpened = document.querySelector('.popup_is-opened');
    
    console.log(evt.target);

    if(!isClosest && isPopupOpened) {
        closeModal(isPopupOpened);
    }
}

const closePopupEsc = (evt) => {
    if (evt.key === "Escape"  || evt.keyCode === 27) {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function openModal(popup) {    
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', closePopupEsc);
    console.log('1');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupEsc);
}


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
//---------------------------------------

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

//---------------------------------------

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

//----------------------------------------Валидация

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
};
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
}; 

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
  
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.disabled = false;
    }
};

enableValidation();