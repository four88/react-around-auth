import { Link } from 'react-router-dom';

export default function Register({
  account,
  handleChange,
  handleRegisterSubmit,
}) {
  return (
    <div className="register_login__container">
      <form className="register_login__form" onSubmit={handleRegisterSubmit}>
        <fieldset className="register_login__set">
          <h2 className="register_login__title">Sign up</h2>
          <label className="register_login__label">
            <input
              type="email"
              name="email"
              id="email"
              value={account.email}
              className="register_login__input register_login__input_type_email"
              onChange={handleChange}
              placeholder="Email"
            />
          </label>

          <label className="register_login__label">
            <input
              type="password"
              name="password"
              id="password"
              value={account.password}
              onChange={handleChange}
              className="register_login__input register_login__input_type_password"
              placeholder="Password"
            />
          </label>

          <button
            type="submit"
            className="register_login__submit_button"
            id="submit-button"
          >
            Sign up
          </button>
          <Link to="/signin" className="register_login__link">
            Already a member? Login here!
          </Link>
        </fieldset>
      </form>
    </div>
  );
}
