import { Link, generatePath, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../const';
import VideoPlayer from '../video-player/video-player';
import { useState } from 'react';

type MovieCardProps = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  isMuted: boolean;
};

export default function MovieCard(props: MovieCardProps) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  return (
    <article
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="small-film-card catalog__films-card"
    >
      <div
        className="small-film-card__image"
        onClick={() => navigate(`/films/${props.id}`)}
      >
        <VideoPlayer
          isMuted={props.isMuted}
          isActive={isActive}
          posterSrc={props.previewImage}
          videoSrc={props.previewVideoLink}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={generatePath(AppRoutes.Movie, { id: props.id })}
        >
          {props.name}
        </Link>
      </h3>
    </article>
  );
}
