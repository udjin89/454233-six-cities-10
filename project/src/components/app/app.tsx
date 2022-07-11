import Main from '../../pages/main/main';
// import Favorites from '../../pages/favorites/favorites';
// import Login from '../../pages/login/login';
// import Property from '../../pages/property/property';
//функция возвращает jsx элемент
function App(props: { counter: number }): JSX.Element {

  // const { counter } = props.counter;
  console.log(`counter=  ${props.counter}`)
  return (
    <Main counter={props.counter} />
    // <Favorites />
    // <Login />
    // <Property />

  );
}

export default App;
