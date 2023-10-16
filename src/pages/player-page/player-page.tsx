import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

type PlayerPageProps = {
  title: string;
  movieLength: string;
  posterSrc: string;
  movieSrc: string;
}

export default function PlayerPage(props: PlayerPageProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="player">
      <Helmet><title>Player</title></Helmet>

      <video src={props.movieSrc} className="player__video" poster={props.posterSrc}></video>

      <button onClick={() => navigate(-1)} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{ left: '30%' }}>Toggler</div>
          </div>
          <div className="player__time-value">{props.movieLength}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{props.title}</div>

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
