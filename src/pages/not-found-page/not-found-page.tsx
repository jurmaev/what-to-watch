import { AppRoutes } from '../../const';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage(): JSX.Element {
  return (
    <>
      <Helmet><title>404 Not Found</title></Helmet>
      <p>404 Not Found</p>
      <Link to={AppRoutes.Main}>Вернуться на главную</Link>
    </>
  );
}
