import HeartIcon from '../images/icon.svg'
export default function Card(props) {

  const handleClick = () => {
    props.onClick(props.card)
  }

  return (
    <div className="element">
      <button className="element__delete-active" onClick={props.onOpenDeleteClick}></button>
      <img src={props.card.link} alt=" " className="element__pic" onClick={handleClick} />
      <div className="element__name">
        <h2 className="element__title">{props.card.name}</h2>
        <button className="element__icon" type="button">
          <img
            src={HeartIcon}
            id="image-icon-heart"
            alt="element icon heart"
            className="element__icon-img"
          />
          <p className="element__like-counter">{props.card.likes.length}</p>
        </button>
      </div>
    </div>
  )
};
