import { Movie } from '../../types/movies';

type OverviewTabProps = {
  movie: Movie;
};

export default function OverviewTab({ movie }: OverviewTabProps) {
  let ratingText: string;

  if (movie.rating <= 5) {
    ratingText = 'Average';
  } else if (movie.rating > 5 && movie.rating <= 9) {
    ratingText = 'Very good';
  } else {
    ratingText = 'Excellent';
  }

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{movie.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ratingText}</span>
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
