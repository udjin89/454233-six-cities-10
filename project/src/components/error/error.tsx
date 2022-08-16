import { useAppSelector } from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const { error } = useAppSelector((state) => state);

  return (error) ? <div className='error-message' style={{ color: 'red', backgroundColor: 'green' }}> {error}</div > : null;

}

export { ErrorMessage };
