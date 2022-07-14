import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';

function LayoutFooter(): JSX.Element {
  return (
    <Fragment>
      <Outlet />
      <footer className="footer container">
        <Link to="/" className="footer__logo-link">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </Fragment>

  );

}
export default LayoutFooter;
/*
  <Outlet /> - сюда подставляется дочерний элемент для отрисовки
*/
