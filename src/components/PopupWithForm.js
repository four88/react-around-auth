export default function PopupWithForm(props) {


  return (
    <div class={`popup ${props.name} ${props.isOpen ? "popup_type_opened" : ""}`}>
      <div class="popup__container">
        <button type="button" class="popup__button-closed" onClick={props.onClose}></button>
        <form class="popup__form" name={props.name}>
          <fieldset class="popup__set">
            <h2 class="popup__title">{props.title}</h2>
            {props.children}
            <button type="submit" class="popup__button popup__button_save popup__button_disabled" id="submit-add-button" disabled>{props.buttonText}</button>
          </fieldset>
        </form>
      </div>
    </div>


  )
}
