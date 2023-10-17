import MovieCard from '../movie-card/movie-card';
import { Films } from '../../types/film';
import { useState } from 'react';

type MovieListProps = {
  length: number;
  films: Films;
}

export default function MovieList(props: MovieListProps) {
  const movies = props.films.slice(0, props.length);
  const [, setHoverCardId] = useState('');

  function onCardHover(id: string): void {
    setHoverCardId(id);
  }

  return (
    <div className="catalog__films-list">
      {movies.map(({ id, name, previewImage }) => <MovieCard key={id} onHover={onCardHover} id={id} name={name} imgLink={previewImage} />)}
    </div>
  );
}
