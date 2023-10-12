import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  authorized: boolean;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  return (
    props.authorized ? props.children : <Navigate to='/login' />
  );
}
