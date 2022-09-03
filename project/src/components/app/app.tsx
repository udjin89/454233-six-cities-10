import { Route, Routes } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import Main from '../../pages/main/main';
import Layout from '../layout/layout';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Property from '../../pages/property/property';
import NotFound from '../../pages/notfound/notfound';
import PrivateRoute from '../private-route/private-route';
import LayoutFooter from '../layout/layout-footer';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

//функция возвращает jsx элемент
function App(): JSX.Element {

  const { authorizationStatus, isDataLoaded } = useAppSelector((state) => state);

  const isCheckedAuth = (): boolean =>
    authorizationStatus === AuthorizationStatus.Unknown;

  if (isCheckedAuth() || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    //оборачиваем для работы навигации из реакта
    // Layout - содержит общие элементы для всех страниц приложения(например header, footer)
    // index - значит корневой элемент по умолчанию
    // path='*' - значит все пути, которые не заданы
    <HistoryRouter history={browserHistory}>
      <Routes>

        <Route path='/' element={<Layout />}>

          <Route index element={<Main />} />

          <Route path='favorites' element={<LayoutFooter />}>

            <Route index element={
              <PrivateRoute hasAccess={authorizationStatus}>
                <Favorites />
              </PrivateRoute>
            }
            />

          </Route>

          <Route path='offer/:id' element={<Property />}>
          </Route>

        </Route>

        <Route path='/login' element={<Login />} />

        <Route path='*' element={<NotFound />} />

      </Routes>
    </HistoryRouter>

  );
}

export default App;
