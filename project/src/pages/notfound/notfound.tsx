import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', border: '10px solid red', height: '100vh' }}>
      <h1 style={{ fontSize: '100px', color: '#DD5246', marginTop: '100px' }}>
        404.
      </h1>

      <br />
      <span style={{ fontSize: '20px', color: 'red', textDecoration: 'underline' }}>Page not found</span>
      <br />

      <Link to="/" style={{ fontSize: '25px', color: 'blue', textDecoration: 'underline', marginTop: '50px' }}>
        Go to main page
      </Link>
    </div>

  );
}

export default NotFound;
