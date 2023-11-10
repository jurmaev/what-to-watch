import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute(props: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  return authorizationStatus === AuthorizationStatus.Auth ? (
    props.children
  ) : (
    <Navigate to="/login" />
  );
}
