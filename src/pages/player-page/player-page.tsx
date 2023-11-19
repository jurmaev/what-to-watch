import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { MINUTES } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchMovie } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import { getFetchingDataStatus } from '../../store/data-process/selectors';
import { getMovie } from '../../store/movie-process/selectors';

export default function PlayerPage() {
  const movie = useAppSelector(getMovie);
  const isFetchingData = useAppSelector(getFetchingDataStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchMovie(id));
    }
  }, [dispatch, id]);

  if (isFetchingData) {
    return <Spinner isActive />;
  }
  if (!movie || !id) {
    return <NotFoundPage />;
  }

  return (
    <div className="player">
      <Helmet>
        <title>Player</title>
      </Helmet>

      <video
        src={movie.videoLink}
        className="player__video"
        poster={movie.backgroundImage}
      >
      </video>

      <button
        onClick={() => navigate(-1)}
        type="button"
        className="player__exit"
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value="0"
              max="100"
            >
            </progress>
            <div className="player__toggler">Toggler</div>
          </div>
          <div className="player__time-value">
            {Math.floor(movie.runTime / MINUTES)}:{movie.runTime % MINUTES}
          </div>
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
