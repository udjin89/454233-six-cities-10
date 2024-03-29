import { Navigate } from 'react-router-dom';
// Принимает в качестве параметра JSX элемент
// и если есть параметр hasAccess
type PrivateRouteProps = {
  children: JSX.Element;
  hasAccess?: string | boolean;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  // eslint-disable-next-line no-console
  if (props.hasAccess === 'AUTH') {
    // eslint-disable-next-line no-console
    return props.children;
  }
  return <Navigate to={'/login'} />;
}

export default PrivateRoute;

/*
  Navigate - перенаправляет на другую страницу автоматически
  Link - ссылка по которой надо нажать, чтобы перейти
*/
