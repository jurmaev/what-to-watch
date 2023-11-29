import { useAppDispatch, useAppSelector } from '../../../hooks';
import { postFavoriteStatus } from '../../../store/api-actions';
import { getMyListLength } from '../../../store/movie-process/selectors';

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
  const myListLength = useAppSelector(getMyListLength);

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={() => {
        dispatch(
          postFavoriteStatus({
            id: id,
            status: Number(!isFavorite),
            category: category,
          })
        );
      }}
    >
      {isFavorite ? (
        <svg width="18" height="14" viewBox="0 0 18 14">
          <use xlinkHref="#in-list"></use>
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
      )}

      <span>My list</span>
      <span className="film-card__count">{myListLength}</span>
    </button>
  );
}
