import { useEffect, useRef } from 'react';

type VideoPlayerProps = {
  posterSrc: string;
  videoSrc: string;
  isActive: boolean;
  isMuted: boolean;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (props.isActive && video) {
      timeoutRef.current = setTimeout(() => {
        video.play();
      }, 1000);
    } else if (!props.isActive && video) {
      video.src = props.videoSrc;
    }

    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, [props.isActive, props.videoSrc]);

  return (
    <video ref={videoRef} src={props.videoSrc} poster={props.posterSrc} width={280} height={175} muted={props.isMuted}></video>
  );
}
