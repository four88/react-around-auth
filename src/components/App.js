import React, { useState, useEffect } from 'react';
import Header from './Header';
import NavMenu from './NavMenu';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Switch, Route, useHistory } from 'react-router-dom';
import api from '../utils/api';
import * as auth from '../utils/auth';


export default function App() {

  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false)
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const [cards, setCards] = useState([])

  // State for store context
  const [currentUser, setCurrentUser] = useState({})

  // for login and register system 
  // check user is login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    password: ""
  });

  // for change stage of InfoTooltip
  const [isSuccess, setIsSuccess] = useState(false)

  // for change state of NavMenu 
  const [isNavExpand, setIsNavExpand] = useState(false)

  //useEffect to fetch api data of user and set to CurrentUserContext value(currentUser)

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


  // if user already login allow user to pass throught to homepage by checking token
  useEffect(() => {
    handleTokenCheck();
  }, [account.email])

  // handle user token (checking user has token or not )
  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');

    auth.checkUserToken(token).then((res) => {
      console.log(res)
      if (res) {
        setAccount({
          email: res.data.email
        })
        setIsLoggedIn(true);
        history.push('/')
      }
    })
  }


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

  const handleNavMenuOpen = () => {
    setIsNavExpand(!isNavExpand)
  }


  const closeAllPopup = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsDeleteConfirmPopupOpen(false)
    setSelectedCard(null)
    setInfoPopupOpen(false)
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

  // handle registraion funciton
  // handle input change
  const handleChange = (evt) => {
    const { name, value } = evt.target
    setAccount({
      ...account,
      [name]: value
    })
    console.log(account)
  }

  // handle submit login form
  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    console.log(account)
    if (!account.email || !account.password) {
      return;
    }
    // use auth.authentication below
    // then set state to null
    auth.authorize(account.email, account.password)
      .then((data) => {
        if (data.token) {
          setAccount({
            email: "",
            password: ""
          })
          setIsLoggedIn(true);
          history.push('/')
        }
      })
      .catch((err) => {
        if (err) {
          setIsSuccess(false)
          setInfoPopupOpen(true)
        }
      })
  }

  // handle register submit
  const handleRegisterSubmit = (evt,) => {
    evt.preventDefault();
    //use aute.register below
    // then set state to null
    auth.register(account.email, account.password)
      .then(() => {
        setAccount({
          email: "",
          password: ""
        })
        setIsSuccess(true)
        setInfoPopupOpen(true)
      })
  }

  // logout function 
  const logout = () => {
    setIsLoggedIn(false);
    setAccount({
      email: "",
      password: ""
    })
    localStorage.removeItem('token')
    history.push('/signin')
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
        <InfoTooltip
          isOpen={isInfoPopupOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopup}
        />



        <div className='page'>

          <Switch>
            <Route path='/signin'>
              <Header
                linkTitle="Sign up"
                toPath="/signup"
                onClick={logout}
                openNav={handleNavMenuOpen}
                isNavExpand={isNavExpand}
              />
              <Login
                account={account}
                handleChange={handleChange}
                handleLoginSubmit={handleLoginSubmit}
              />
            </Route>
            <Route path='/signup'>
              <Header
                linkTitle="Log in"
                toPath="/signin"
                onClick={logout}
                openNav={handleNavMenuOpen}
                isNavExpand={isNavExpand}
              />
              <Register
                account={account}
                handleChange={handleChange}
                handleRegisterSubmit={handleRegisterSubmit}
              />
            </Route>
            <ProtectedRoute path="/" isLoggedIn={isLoggedIn} toPath="/signin" >
              {isNavExpand && <NavMenu
                email={account.email}
                onClickLogout={logout}
              />}
              <Header
                toPath="/signin"
                emailTitle={account.email}
                linkTitle="Log out"
                onClick={logout}
                openNav={handleNavMenuOpen}
                isNavExpand={isNavExpand}
              />
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
            </ProtectedRoute>

          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider >

  )
}
