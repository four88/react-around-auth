import { useState } from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup(props) {

  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")

  const handleTitleChange = (evt) => {
    setTitle(evt.target.value)
  }
  const handleLinkChange = (evt) => {
    setLink(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onUpdateCard({
      title,
      link
    })
  }

  return (

    <PopupWithForm
      name='add'
      isOpen={props.isOpen}
      title="New Place"
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Create"
    >
      <label className="popup__label">
        <input
          type="text"
          name="inputTitle"
          id="card-title"
          className="popup__input_type_first popup__input"
          placeholder="Your place"
          minLength="1"
          maxLength="30"
          onChange={handleTitleChange}
          required
        />
        <p className="popup__error" id="card-title-error"></p>
      </label>
      <label className="popup__label">
        <input
          type="url"
          name="inputLink"
          className=" popup__input_type_second popup__input"
          id="card-link"
          placeholder="Your image link"
          onChange={handleLinkChange}
          required
        />
        <p className="popup__error" id="card-link-error"></p>
      </label>

    </PopupWithForm>


  )
}
