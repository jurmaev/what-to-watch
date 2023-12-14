import { Navigate } from 'react-router-dom';
import { AuthorizationStatusValues } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
  withStatus: AuthorizationStatusValues;
  navigateTo: string;
};

export default function PrivateRoute(props: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return authorizationStatus === props.withStatus ? (
    props.children
  ) : (
    <Navigate to={props.navigateTo} />
  );
}
