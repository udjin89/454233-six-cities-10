import { useState, useLayoutEffect } from 'react';
import { Router } from 'react-router-dom';
import type { BrowserHistory } from 'history';


// Код взят из самого React router (можно посмотреть пулреквест)
export interface HistoryRouterProps {
  history: BrowserHistory
  basename?: string
  children?: React.ReactNode
}
// Принимат как пропс обьект history. Через этот обьект можно управлять маршрутизацией
function HistoryRouter({
  basename,
  children,
  history,
}: HistoryRouterProps) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });
  //Выполняется синхронно, нужно выполнить до фактической отрисовки компонентов
  // Подписка на изменение истории
  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;
