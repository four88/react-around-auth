import Card from './Card'
import Api from '../utils/Api'
import React, { useState, useEffect } from 'react'


function Main(props) {
  const [userName, setUserName] = useState("")
  const [userAbout, setUserAbout] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [cardInfo, setCardInfo] = useState([])

  const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
      authorization: "b8628092-ca99-4978-bdb3-720edea9284d",
      "Content-Type": "application/json",
    }
  });

  useEffect(() => {
    api.getUserInfo().then((res) => {
      setUserName(res.name)
      setUserAbout(res.about)
      setUserAvatar(res.avatar)
    })
      .catch(err => console.log(err))

    api.getInitialCards().then((res) => {
      setCardInfo(res)
    })
      .catch(err => console.log(err))
  }, [])



  return (
    <main>

      <section class="profile">
        <div class="profile__img-wrap" onClick={props.onEditAvatarClick}>
          <div class="profile__img-edit"></div>
          <img
            src={userAvatar}
            id="image-profile"
            alt="profile img"
            class="profile__img"
          />

        </div>
        <div class="profile__info">
          <div class="profile__info-wrap">
            <h1 class="profile__info-name">{userName}</h1>
            <button class="profile__button-edit" type="button" onClick={props.onEditProfileClick}></button>
            <p class="profile__info-career">{userAbout}</p>
          </div>
          <button class="profile__button profile__button-add" type="button" onClick={props.onAddPlaceClick}></button>
        </div>
      </section>

      <section class="elements">
        {cardInfo.map((card) => {
          return <Card key={card._id} card={card} onClick={props.onCardClick} onOpenDeleteClick={props.onOpenDeleteClick} />
        })}
      </section>
    </main>
  );
}
export default Main;
