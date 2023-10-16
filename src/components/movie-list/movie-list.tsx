import MovieCard from '../movie-card/movie-card';
import { Films } from '../../types/film';
import { useState } from 'react';

type MovieListProps = {
  length: number;
  films: Films;
}

export default function MovieList(props: MovieListProps) {
  const movies = props.films.slice(0, props.length);
  const [hoverCardId, setHoverCardId] = useState(-1);

  function onCardHover(id: number): void {
    setHoverCardId(id);
    console.log(hoverCardId);
  }

  return (
    <div className="catalog__films-list">
      {movies.map(({ id, title, imgLink }) => <MovieCard key={id} onHover={onCardHover} id={id} title={title} imgLink={imgLink} />)}
    </div>
  );
}
