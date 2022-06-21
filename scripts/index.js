const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditCloseButton = document.querySelector('.popup__close_place_edit');
const popupNameField = document.querySelector('.popup__field_type_name');
const profileName = document.querySelector('.profile__name');
const popupDiscriptionField = document.querySelector('.popup__field_type_discription');
const profileDiscription = document.querySelector('.profile__discription');
const popupForm = document.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddCloseButton = document.querySelector('.popup__close_place_add');

function getFieldContent() {
    popupNameField.value = profileName.textContent;
    popupDiscriptionField.value = profileDiscription.textContent;
}

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    getFieldContent();
});

popupEditCloseButton.addEventListener('click', () => {
    closePopup(popupEdit);
});

popupAddCloseButton.addEventListener('click', () => {
    closePopup(popupAdd);
});

addButton.addEventListener('click', () => {
    openPopup(popupAdd);
});

popupForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameField.value;
    profileDiscription.textContent = popupDiscriptionField.value;
    closePopup(popupEdit);
});

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


const cardsList = document.querySelector('.elements__list');
const addCardForm = document.querySelector('.popup__form_type_add');
const popupCardNameField = addCardForm.querySelector('.popup__field_type_place-name');
const popupCardLinkField = addCardForm.querySelector('.popup__field_type_place-link');
const cardTemplate = document.querySelector('.template-card');

const getCardByEvent = evt => evt.currentTarget.closest('.element');

const deleteCard = evt => {
    const card = getCardByEvent(evt);

    card.remove();
}

const likeCard = evt => {
    const like = evt.currentTarget.closest('.element__like');
    like.classList.toggle('element__like_type_active');

};


const createCard = function(name, link) {
    const card = cardTemplate.content
        .querySelector('.element')
        .cloneNode(true);
        
    card.querySelector('.element__photo').src = link;
    card.querySelector('.element__discription').textContent = name;

    card.querySelector('.element__delete').addEventListener('click', deleteCard);

    card.querySelector('.element__like').addEventListener('click', likeCard);

    card.querySelector('.element__photo').addEventListener('click', evt => {
        evt.currentTarget.closest('.element__photo');

        let popupImageZoom = document.querySelector('.popup_type_image');
        openPopup(popupImageZoom);

        popupImageZoom.querySelector('.popup__header_place_image').textContent = name;
        popupImageZoom.querySelector('.popup__image').src = link;

        popupImageZoom.querySelector('.popup__close_place_image').addEventListener('click', (evt) => {
            evt.currentTarget.closest('.popup__close_place_image');
            closePopup(popupImageZoom);
        });

    });

    

    return card;
};


const addCard = ({name, link}) => {
    const card = createCard(name, link);

    cardsList.prepend(card);
};

initialCards.forEach(addCard);

const handleCardSubmit = evt => {
    evt.preventDefault();

    const cardInfo = {
        name: popupCardNameField.value,
        link: popupCardLinkField.value,
      };

    addCard(cardInfo);

    addCardForm.reset();

    closePopup(popupAdd);
}

addCardForm.addEventListener('submit', handleCardSubmit);