import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  isAuthorized: AuthorizationStatus;
  children: JSX.Element;
};

export default function PrivateRoute(props: PrivateRouteProps) {
  return props.isAuthorized === AuthorizationStatus.Auth ? (
    props.children
  ) : (
    <Navigate to="/login" />
  );
}
