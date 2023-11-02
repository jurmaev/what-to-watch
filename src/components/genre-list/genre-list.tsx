import { Link } from 'react-router-dom';
import MovieList from '../movie-list/movie-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Genres } from '../../const';
import { useState } from 'react';
import cn from 'classnames';
import { changeGenre, filterByGenre } from '../../store/action';
import ShowMore from '../show-more/show-more';

const INITIAL_MOVIE_LENGTH = 8;

export default function GenreList() {
  const currentGenre = useAppSelector((state) => state.genre);
  const allMoviePreviews = useAppSelector((state) => state.allMoviePreviews);
  const [movieLength, setMovieLength] = useState(INITIAL_MOVIE_LENGTH);
  const dispatch = useAppDispatch();
  const moviePreviews = useAppSelector((state) => state.moviePreviews);
  const genres = [
    ...new Set(allMoviePreviews.map((movie) => movie.genre)),
  ].sort();
  genres.unshift(Genres.All);

  function handleShowMoreClick() {
    setMovieLength(
      movieLength + INITIAL_MOVIE_LENGTH > allMoviePreviews.length
        ? allMoviePreviews.length
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
              dispatch(changeGenre(genre));
              dispatch(filterByGenre(genre));
              setMovieLength(INITIAL_MOVIE_LENGTH);
            }}
          >
            <Link to="#" className="catalog__genres-link">
              {genre}
            </Link>
          </li>
        ))}
      </ul>

      <MovieList moviePreviews={moviePreviews} length={movieLength} />

      <ShowMore
        isActive={movieLength < moviePreviews.length}
        onClick={handleShowMoreClick}
      />
    </section>
  );
}
