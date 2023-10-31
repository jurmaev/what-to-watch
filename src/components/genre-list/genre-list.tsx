import { Link } from 'react-router-dom';
import MovieList from '../movie-list/movie-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Genres } from '../../const';
import { moviePreviews as allMoviePreviews } from '../../mocks/movie-previews';
import { useState } from 'react';
import cn from 'classnames';
import { filterByGenre } from '../../store/action';

export default function GenreList() {
  const [activeFilter, setActiveFilter] = useState<string>(Genres.All);
  const dispatch = useAppDispatch();
  const moviePreviews = useAppSelector((state) => state.moviePreviews);
  const genres = [
    ...new Set(allMoviePreviews.map((movie) => movie.genre)),
  ].sort();
  genres.unshift(Genres.All);

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
            }}
          >
            <Link to="#" className="catalog__genres-link">
              {genre}
            </Link>
          </li>
        ))}
      </ul>

      <MovieList moviePreviews={moviePreviews} length={16} />

      <div className="catalog__more">
        <button className="catalog__button" type="button">
          Show more
        </button>
      </div>
    </section>
  );
}
