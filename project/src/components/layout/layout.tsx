import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-action';

function Layout(): JSX.Element {

  const dispatch = useAppDispatch();

  const { authorizationStatus, favorites, userLogin } = useAppSelector((state) => state);
  const favoritesCount = favorites.length;

  const isLogin = (authorizationStatus === AuthorizationStatus.Auth);

  function singOut(evt: React.MouseEvent) {
    evt.preventDefault();
    dispatch(logoutAction());
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to='/' className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              {
                isLogin ?
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                          {userLogin}
                        </span>
                        <span className="header__favorite-count">{favoritesCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to="/" onClick={singOut}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </ul>
                  :
                  <ul className="header__nav-list">
                    <Link className="header__nav-link header__nav-link--profile" to="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </ul>
              }
            </nav>
          </div>
        </div>
      </header >
      <Outlet />
    </div >
  );

}
export default Layout;
/*
  <Outlet /> - сюда подставляется дочерний элемент для отрисовки
*/
