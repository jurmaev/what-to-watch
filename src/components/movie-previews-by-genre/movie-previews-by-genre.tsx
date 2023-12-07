import { Link } from 'react-router-dom';
import MovieList from '../movie-list/movie-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Genres, GenresValues } from '../../const';
import { useMemo, useState } from 'react';
import cn from 'classnames';
import ShowMore from '../ui/show-more/show-more';
import { getMoviePreviews } from '../../store/movie-process/selectors';
import { getGenre } from '../../store/genre-process/selectors';
import { changeGenre } from '../../store/genre-process/genre-process';

const INITIAL_MOVIE_LENGTH = 8;

export default function MoviePreviewsByGenre() {
  const currentGenre = useAppSelector(getGenre);
  const moviePreviews = useAppSelector(getMoviePreviews);
  const [movieLength, setMovieLength] = useState(INITIAL_MOVIE_LENGTH);
  const dispatch = useAppDispatch();
  const filteredMoviePreviews = useMemo(
    () =>
      moviePreviews.filter((moviePreview) =>
        currentGenre === Genres.All
          ? moviePreview
          : moviePreview.genre === currentGenre
      ),
    [moviePreviews, currentGenre]
  );

  const genres = [...new Set(moviePreviews.map((movie) => movie.genre))].sort();
  genres.unshift(Genres.All);

  function handleShowMoreClick() {
    setMovieLength(
      movieLength + INITIAL_MOVIE_LENGTH > moviePreviews.length
        ? moviePreviews.length
        : movieLength + INITIAL_MOVIE_LENGTH
    );
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        {genres.map((genre) => (
          <li
            key={genre}
            className={cn('catalog__genres-item', {
              'catalog__genres-item--active': genre === currentGenre,
            })}
            onClick={() => {
              dispatch(changeGenre(genre as GenresValues));
              setMovieLength(INITIAL_MOVIE_LENGTH);
            }}
            data-testid={genre}
          >
            <Link to="#" className="catalog__genres-link">
              {genre}
            </Link>
          </li>
        ))}
      </ul>

      <MovieList moviePreviews={filteredMoviePreviews} length={movieLength} />

      <ShowMore
        isActive={movieLength < filteredMoviePreviews.length}
        onClick={handleShowMoreClick}
      />
    </section>
  );
}
