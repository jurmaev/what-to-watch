import { useEffect, useRef, useState } from 'react';

type VideoPlayerProps = {
  posterSrc: string;
  videoSrc: string;
  isActive: boolean;
  isMuted: boolean;
};

export default function VideoPlayer(props: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  function handleLoadedData() {
    setIsLoaded(true);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.addEventListener('loadeddata', handleLoadedData);
    return () => video.removeEventListener('loadeddata', handleLoadedData);
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!isLoaded || !video) {
      return;
    }

    if (props.isActive) {
      timeoutRef.current = setTimeout(() => {
        video.play();
      }, 1000);
    } else if (!props.isActive) {
      video.src = props.videoSrc;
    }

    return () =>
      clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);
  }, [props.isActive, props.videoSrc, isLoaded]);

  return (
    <video
      ref={videoRef}
      src={props.videoSrc}
      poster={props.posterSrc}
      width={280}
      height={175}
      muted={props.isMuted}
    >
    </video>
  );
}
