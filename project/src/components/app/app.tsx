import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import Main from '../../pages/main/main';
import Layout from '../layout/layout';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Property from '../../pages/property/property';
import NotFound from '../../pages/notfound/notfound';
import PrivateRoute from '../private-route/private-route';
import LayoutFooter from '../layout/layout-footer';

//функция возвращает jsx элемент
function App(props: { counter: number }): JSX.Element {

  return (
    //оборачиваем для работы навигации из реакта
    // Layout - содержит общие элементы для всех страниц приложения(например header, footer)
    //
    // index - значит корневой элемент по умолчанию
    // path='*' - значит все пути, которые не заданы
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />}>

          <Route index element={<Main counter={props.counter} />} />

          <Route path='favorites' element={<LayoutFooter />}>

            <Route index element={
              <PrivateRoute hasAccess={AuthorizationStatus.Auth}>
                <Favorites />
              </PrivateRoute>
            }
            />

          </Route>

          <Route path='offer'>
            <Route index element={<Property />} />
            <Route path=':id' element={<Property />} />
          </Route>

        </Route>

        <Route path='/login' element={<Login />} />

        <Route path='*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
