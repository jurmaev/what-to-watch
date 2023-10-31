import { Link } from 'react-router-dom';
import MovieList from '../movie-list/movie-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Genres } from '../../const';
import { moviePreviews as allMoviePreviews } from '../../mocks/movie-previews';
import { useState } from 'react';
import cn from 'classnames';
import { filterByGenre } from '../../store/action';
import ShowMore from '../show-more/show-more';

export default function GenreList() {
  const [activeFilter, setActiveFilter] = useState<string>(Genres.All);
  const [movieLength, setMovieLength] = useState(8);
  const dispatch = useAppDispatch();
  const moviePreviews = useAppSelector((state) => state.moviePreviews);
  const genres = [
    ...new Set(allMoviePreviews.map((movie) => movie.genre)),
  ].sort();
  genres.unshift(Genres.All);

  function handleShowMoreClick() {
    setMovieLength(
      movieLength + 8 > allMoviePreviews.length
        ? allMoviePreviews.length
        : movieLength + 8
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
              'catalog__genres-item--active': genre === activeFilter,
            })}
            onClick={() => {
              setActiveFilter(genre);
              dispatch(filterByGenre(genre));
              setMovieLength(8);
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
