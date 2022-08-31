import logo from '../images/logo.png'
import { Link } from 'react-router-dom'

export default function Header({
  emailTitle,
  toPath,
  linkTitle,
  onClick
}) {
  return (

    <header className="header">
      <img id="image-logo" alt="logo" className="header__logo" src={logo} />
      <ul className='header__menu'>
        <li className='header__list'>
          <h1 className='header__email'>{emailTitle}</h1>
        </li>
        <li className='header__list'>
          <Link to={toPath} className='header__link' onClick={onClick}>{linkTitle}</Link>
        </li>
      </ul>
    </header>


  );

}

