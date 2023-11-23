import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute(props: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return authorizationStatus === AuthorizationStatus.Auth ? (
    props.children
  ) : (
    <Navigate to="/login" />
  );
}
