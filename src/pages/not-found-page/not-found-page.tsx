import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet><title>404 Not Found</title></Helmet>
      <p>404 Not Found</p>
      <Link to="/">Вернуться на главную</Link>
    </>
  );
}
