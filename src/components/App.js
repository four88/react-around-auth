import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Api from '../utils/api'

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const [cards, setCards] = useState([])

  // State for store context
  const [currentUser, setCurrentUser] = useState({})

  //useEffect to fetch api data of user and set to CurrentUserContext value(currentUser)
  const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
      authorization: "b8628092-ca99-4978-bdb3-720edea9284d",
      "Content-Type": "application/json",
    }
  });


  useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res)
    })
      .catch(err => console.log(err))

    api.getInitialCards().then((res) => {
      setCards(res)
    })
      .catch(err => console.log(err))
  }, [])

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

  const handleCardLike = (card) => {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    }).catch(err => console.log(err));
  }

  const handleDeleteCard = (card) => {

    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((newCard) => newCard._id !== card._id))
      })
      .catch(err => console.log(err))

  }

  const handleUpdateUser = ({ name, about }) => {
    api.updateUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res)
        setIsEditProfilePopupOpen(false)
      })
      .catch(err => console.lot(err))
  }

  const handleUpdateAvatar = ({ avatar }) => {
    api.updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false)
      })
      .catch(err => console.log(err))
  }

  const handleUpdateCard = ({ title, link }) => {
    api.addNewCard(title, link)
      .then((res) => {
        setCards([res, ...cards]);
        setIsAddPlacePopupOpen(false)
      })
      .catch(err => console.log(err))
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopup}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onUpdateCard={handleUpdateCard}
        />



        <div className='page'>
          <Header />
          <Main
            cardInfo={cards}
            onEditAvatarClick={handleEditAvatarPopup}
            onEditProfileClick={handleEditPropfilePopup}
            onAddPlaceClick={handleAddPlacePopup}
            onCardClick={handleImagePopup}
            onOpenDeleteClick={handleDeleteConfirmPopup}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
          />
          <Footer />
        </div>
      </div>

    </CurrentUserContext.Provider >

  )
}
