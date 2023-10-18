import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Movies } from '../../types/movies';

type PlayerPageProps = {
  movies: Movies;
}

export default function PlayerPage({ movies }: PlayerPageProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return (<Navigate to='*' />);
  }

  return (
    <div className="player">
      <Helmet><title>Player</title></Helmet>

      <video src={movie.videoLink} className="player__video" poster={movie.backgroundImage}></video>

      <button onClick={() => navigate(-1)} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100"></progress>
            <div className="player__toggler">Toggler</div>
          </div>
          <div className="player__time-value">{Math.floor(movie.runTime / 60)}:{movie.runTime % 60}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{movie.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
