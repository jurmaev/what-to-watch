import { Link } from 'react-router-dom';
import { MoviePreviews } from '../../types/movies';
import MovieList from '../movie-list/movie-list';
import { useAppSelector } from '../../hooks';
import { Genres } from '../../const';

type GenreListProps = {
  moviePreviews: MoviePreviews;
};

export default function GenreList({ moviePreviews }: GenreListProps) {
  const movies = useAppSelector((state) => state.movies);
  const genres = [...new Set(movies.map((movie) => movie.genre))].sort();
  genres.unshift(Genres.All);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        {/* <li className="catalog__genres-item catalog__genres-item--active">
          <Link to="#" className="catalog__genres-link">
            All genres
          </Link>
        </li> */}
        {genres.map((genre) => (
          <li key={genre} className="catalog__genres-item">
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
