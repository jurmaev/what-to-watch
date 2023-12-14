import { useNavigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { postFavoriteStatus } from '../../../store/api-actions';
import { getMyListLength } from '../../../store/movie-process/selectors';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';

type MyListButtonProps = {
  id: string;
  isFavorite: boolean;
  category: 'movie' | 'promoMovie';
};

export default function MyListButton({
  id,
  isFavorite,
  category,
}: MyListButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const myListLength = useAppSelector(getMyListLength);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  function handleButtonClick() {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoutes.Login);
    } else {
      dispatch(
        postFavoriteStatus({
          id: id,
          status: Number(!isFavorite),
          category: category,
        })
      );
    }
  }

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleButtonClick}
    >
      {isFavorite && authorizationStatus === AuthorizationStatus.Auth ? (
        <svg width="18" height="14" viewBox="0 0 18 14" data-testid="inList">
          <use xlinkHref="#in-list"></use>
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20" data-testid="add">
          <use xlinkHref="#add"></use>
        </svg>
      )}

      <span>My list</span>
      <span className="film-card__count">{myListLength}</span>
    </button>
  );
}
