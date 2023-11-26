import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/api-actions';
import {
  getAuthorizationStatus,
  getAvatarUrl,
} from '../../store/user-process/selectors';

export default function UserBlock() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const avatarUrl = useAppSelector(getAvatarUrl);

  function getAuthBlock() {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      return (
        <>
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img
                src={avatarUrl}
                alt="User avatar"
                width="63"
                height="63"
                onClick={() => navigate(AppRoutes.MyList)}
              />
            </div>
          </li>
          <li
            className="user-block__item"
            onClick={() => {
              dispatch(logout());
            }}
          >
            <a className="user-block__link">Sign out</a>
          </li>
        </>
      );
    } else if (authorizationStatus === AuthorizationStatus.NoAuth) {
      return (
        <Link to={AppRoutes.Login} className="user-block__link">
          Sign in
        </Link>
      );
    }
  }

  return <ul className="user-block">{getAuthBlock()}</ul>;
}
