import { Link } from 'react-router-dom';

type MovieCardProps = {
  id: string;
  name: string;
  imgLink: string;
  onHover: (id: string) => void;
}

export default function MovieCard(props: MovieCardProps) {
  return (
    <article onMouseOver={() => props.onHover(props.id)} className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={props.imgLink} alt={props.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${props.id}`}>{props.name}</Link>
      </h3>
    </article>
  );
}
