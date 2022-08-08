import HeartIcon from '../images/icon.svg'
export default function Card(props) {

  const handleClick = () => {
    props.onClick(props.card)
  }

  return (
    <div class="element">
      <button class="element__delete-active" onClick={props.onOpenDeleteClick}></button>
      <img src={props.card.link} alt=" " class="element__pic" onClick={handleClick} />
      <div class="element__name">
        <h2 class="element__title">{props.card.name}</h2>
        <button class="element__icon" type="button">
          <img
            src={HeartIcon}
            id="image-icon-heart"
            alt="element icon heart"
            class="element__icon-img"
          />
          <p class="element__like-counter">{props.card.likes.length}</p>
        </button>
      </div>
    </div>
  )
};
