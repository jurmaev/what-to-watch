import { ReactNode } from 'react';
import {Link} from 'react-router-dom';

type MovieCardProps = {
  title: string;
  imgLink: string;
}

export default function MovieCard(props: MovieCardProps): ReactNode {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={props.imgLink} alt={props.title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to="/films/1">{props.title}</Link>
      </h3>
    </article>
  );
}
