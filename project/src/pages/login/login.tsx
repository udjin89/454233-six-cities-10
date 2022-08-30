import { useRef, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-action';
import { AuthData } from '../../types/types';
import { processErrorHandle } from '../../services/process-handle-error';
import { AuthorizationStatus } from '../../const';


function Login(): JSX.Element {

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { authorizationStatus } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {

    return <Navigate to="/"></Navigate>;
  }
  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();


    const containsDigit = /^.*[0-9]+.*$/;
    const containsLetters = /^.*[a-zA-Z]+.*$/;
    const minimumChars = /^.{2,}$/;


    if (loginRef.current !== null && passwordRef.current !== null) {
      const password = passwordRef.current.value.toString();
      if (minimumChars.test(password) && containsLetters.test(password) && containsDigit.test(password)) {
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        });
      }
      else { processErrorHandle('Password incorrect!'); }
    }


  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to='/'>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="name"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                />
              </div>
              <button className="login__submit form__submit button" type="submit" >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Paris</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>


  );
}

export default Login;
