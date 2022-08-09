import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const handleEditPropfilePopup = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  const handleAddPlacePopup = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  const handleEditAvatarPopup = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  const handleDeleteConfirmPopup = () => {
    setIsDeleteConfirmPopupOpen(!isDeleteConfirmPopupOpen)
  }

  const handleImagePopup = (card) => {
    setSelectedCard(card)
  }


  const closeAllPopup = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsDeleteConfirmPopupOpen(false)
    setSelectedCard(null)
  }


  return (

    <div class="body">
      <ImagePopup card={selectedCard} onClose={closeAllPopup} />

      <PopupWithForm
        name='add'
        isOpen={isAddPlacePopupOpen}
        title="New Place"
        onClose={closeAllPopup}
        buttonText="Create"
      >
        <label class="popup__label">
          <input
            type="text"
            name="inputTitle"
            id="card-title"
            class="popup__input_type_first popup__input"
            placeholder="Your place"
            minLength="1"
            maxLength="30"
            required
          />
          <p class="popup__error" id="card-title-error"></p>
        </label>
        <label class="popup__label">
          <input
            type="url"
            name="inputLink"
            class=" popup__input_type_second popup__input"
            id="card-link"
            placeholder="Your image link"
            required
          />
          <p class="popup__error" id="card-link-error"></p>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name='edit'
        isOpen={isEditProfilePopupOpen}
        title="Edit Profile"
        onClose={closeAllPopup}
        buttonText="Submit"
      >
        <label class="popup__label">
          <input
            type="text"
            name="inputName"
            id="owner-name"
            class="popup__input_type_first popup__input"
            placeholder="Your name"
            minLength="2"
            maxLength="40"
            required
          />
          <p class="popup__error" id="card-title-error"></p>
        </label>
        <label class="popup__label">
          <input
            type="text"
            name="inputCareer"
            class=" popup__input_type_second popup__input"
            id="owner-career"
            placeholder="Your Career"
            minLength="2"
            maxLength="200"
            required
          />
          <p class="popup__error" id="card-link-error"></p>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name='avatar'
        isOpen={isEditAvatarPopupOpen}
        title="Change Profile Picture"
        onClose={closeAllPopup}
        buttonText="Submit"
      >

        <label class="popup__label">
          <input
            type="url"
            name="avatar"
            class=" popup__input_type_second popup__input"
            id="avatar-link"
            placeholder="Your link URL"
            required
          />
          <p class="popup__error" id="card-link-error"></p>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name='delete'
        isOpen={isDeleteConfirmPopupOpen}
        title="Are you sure?"
        onClose={closeAllPopup}
        buttonText="Submit"
      >
      </PopupWithForm>



      <div class='page'>
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarPopup}
          onEditProfileClick={handleEditPropfilePopup}
          onAddPlaceClick={handleAddPlacePopup}
          onCardClick={handleImagePopup}
          onOpenDeleteClick={handleDeleteConfirmPopup}

        />
        <Footer />
      </div>

    </div >

  )
}
