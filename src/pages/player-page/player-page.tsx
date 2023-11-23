import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useRef, useState } from 'react';
import { fetchMovie } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import {
  getMovie,
  getMovieFetchingStatus,
} from '../../store/movie-process/selectors';

function getTimeLeft(seconds: number): string {
  if (seconds / 3600 < 1) {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
  }
  return new Date(seconds * 1000).toISOString().slice(11, 19);
}

export default function PlayerPage() {
  const movie = useAppSelector(getMovie);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLProgressElement | null>(null);
  const togglerRef = useRef<HTMLDivElement | null>(null);
  const timeLeftRef = useRef<HTMLDivElement | null>(null);
  const isFetchingData = useAppSelector(getMovieFetchingStatus);
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

  function handleControlClick() {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleFullScreenClick() {
    if (!isFullScreen) {
      videoRef.current?.requestFullscreen({ navigationUI: 'hide' });
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  }

  function handleTimeUpdate() {
    if (
      progressRef.current &&
      videoRef.current &&
      movie &&
      togglerRef.current &&
      timeLeftRef.current
    ) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressRef.current.value = progress;
      togglerRef.current.style.left = `${progress}%`;
      timeLeftRef.current.innerHTML = getTimeLeft(
        videoRef.current.duration - videoRef.current.currentTime
      );
    }
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
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
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
              ref={progressRef}
            >
            </progress>
            <div className="player__toggler" ref={togglerRef}>
              Toggler
            </div>
          </div>
          <div className="player__time-value" ref={timeLeftRef}>
            {getTimeLeft(movie.runTime)}
          </div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={handleControlClick}
          >
            {isPlaying ? (
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </>
            )}
          </button>
          <div className="player__name">{movie.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={handleFullScreenClick}
          >
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
