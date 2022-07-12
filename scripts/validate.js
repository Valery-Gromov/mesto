const validationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active',
  };


const showInputError = (validationObject,formElement, inputElement, errorMessage) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(validationObject.inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationObject.errorClass);
};

const hideInputError = (validationObject ,formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationObject.inputErrorClass);

    errorElement.classList.remove(validationObject.errorClass);
    errorElement.textContent = '';
};

const hasInvalidInput = inputList => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

const enableSubmitButton = buttonElement => {
    buttonElement.disabled = false;
}

const disableSubmitButton = buttonElement => {
    buttonElement.disabled = true;
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement);
    } else {
        enableSubmitButton(buttonElement);
    };
};

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(validationObject ,formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(validationObject ,formElement, inputElement);
    };
};

const setEventListeners = (validationObject ,formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
    const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);

            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (validationObject) => {
    const formList = Array.from(document.querySelectorAll(validationObject.formSelector));

    formList.forEach(formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
    
        setEventListeners(validationObject, formElement);
    });
};

enableValidation(validationObject);

