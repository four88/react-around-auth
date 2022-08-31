export default function InfoTooltip({
  isOpen,
  srcImg,
  altImg,
  title,
  onClose
}) {


  return (
    <div className={`info popup ${isOpen ? 'popup_typed_opened' : ''}`}>
      <div className='info__container'>
        <button type="button" className="popup__button-closed" onClick={onClose}></button>
        <img
          src={srcImg}
          alt={altImg}
          className="info__img"
        />
        <h1 className="info__title">
          {title}
        </h1>
      </div>

    </div>
  )
}
