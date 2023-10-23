import MovieCard from '../movie-card/movie-card';
import { MoviePreviews } from '../../types/movies';

type MovieListProps = {
  length: number;
  moviePreviews: MoviePreviews;
}

export default function MovieList(props: MovieListProps) {
  const movies = props.moviePreviews.slice(0, props.length);

  return (
    <div className="catalog__films-list">
      {movies.map(({ id, name, previewImage, previewVideoLink }) => (
        <MovieCard
          key={id}
          previewVideoLink={previewVideoLink}
          id={id}
          isMuted
          name={name}
          previewImage={previewImage}
        />))}
    </div>
  );
}
