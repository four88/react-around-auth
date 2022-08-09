export default function ImagePopup(props) {


  return (
    <div class={`pic popup ${props.card ? 'popup_type_opened' : ""}`} >
      <div class="pic__container">
        <button
          type="button"
          class="pic__button-closed popup__button-closed"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
          class="pic__img"
        />
        <h2 class="pic__title">{props.card ? props.card.name : ""}</h2>
      </div>
    </div >
  )
}
