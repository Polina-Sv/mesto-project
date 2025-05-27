const popupCloseBtns = document.querySelectorAll('.popup__close');
popupCloseBtns.forEach((button) => {
    button.addEventListener('click', evt => {
        closeModal(button.closest('.popup'));
    })
})

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

export {closeModal, openModal};