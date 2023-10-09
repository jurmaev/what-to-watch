import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  authorized: boolean;
  children: ReactNode;
}

export default function PrivateRoute(props: PrivateRouteProps): ReactNode {
  return (
    props.authorized ? props.children : <Navigate to='/login' />
  );
}
