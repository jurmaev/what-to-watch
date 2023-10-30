import { Movie } from '../../types/movies';

type OverviewTabProps = {
  movie: Movie;
};

function getRatingText(rating: number) {
  if (rating <= 5) {
    return 'Average';
  } else if (rating > 5 && rating <= 9) {
    return 'Very good';
  } else {
    return 'Excellent';
  }
}

export default function OverviewTab({ movie }: OverviewTabProps) {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{movie.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">
            {getRatingText(movie.rating)}
          </span>
          <span className="film-rating__count">
            {movie.scoresCount} ratings
          </span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{movie.description}</p>

        <p className="film-card__director">
          <strong>Director: {movie.director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>Starring: {movie.starring.join(', ')} and other</strong>
        </p>
      </div>
    </>
  );
}
