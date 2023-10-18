import MovieCard from '../movie-card/movie-card';
import { useState } from 'react';
import { MoviePreview } from '../../types/movies';

type MovieListProps = {
  length: number;
  moviePreviews: MoviePreview[];
}

export default function MovieList(props: MovieListProps) {
  const movies = props.moviePreviews.slice(0, props.length);
  const [, setHoverCardId] = useState('');

  return (
    <div className="catalog__films-list">
      {movies.map(({ id, name, previewImage }) => <MovieCard key={id} onHover={setHoverCardId} id={id} name={name} imgLink={previewImage} />)}
    </div>
  );
}