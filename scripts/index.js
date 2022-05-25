const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const popupNameField = document.querySelector('.popup__name-field');
const profileName = document.querySelector('.profile__name');
const popupDiscriptionField = document.querySelector('.popup__discription-field');
const profileDiscription = document.querySelector('.profile__discription');
const popupForm = document.querySelector('.popup__form');

function openPopup() {
    popup.classList.add('popup_opened');
    popupNameField.value = profileName.textContent;
    popupDiscriptionField.value = profileDiscription.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
    // profileName.textContent = popupNameField.value;
    // profileDiscription.textContent = popupDiscriptionField.value;
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

popupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    profileName.textContent = popupNameField.value;
    profileDiscription.textContent = popupDiscriptionField.value;
    closePopup();
});