const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

const isUrlValid = (inputElement) => {
  if (inputElement.type === 'url') {
    return urlRegex.test(inputElement.value);
  }
  return true;
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
};
  
export const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
}; 

const isValid = (formElement, inputElement) => {
    if (inputElement.type === 'url' && !isUrlValid(inputElement)) {
      showInputError(formElement, inputElement, 'Введите корректный URL');
      return false;
    }
    
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
      return false;
    }
    
    hideInputError(formElement, inputElement);
    return true;
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
        if (inputElement.type === 'url') {
            return !inputElement.validity.valid || !isUrlValid(inputElement);
        }
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.disabled = false;
    }
};

export default enableValidation;