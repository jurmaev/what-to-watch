import { fireEvent, render, screen } from '@testing-library/react';
import VideoPlayer from './video-player';

describe('VideoPlayer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly', () => {
    render(<VideoPlayer posterSrc="" videoSrc="" isActive isMuted />);

    expect(screen.getByTestId('video')).toBeInTheDocument();
  });

  it('starts playing after 1 second', () => {
    HTMLVideoElement.prototype.play = vi.fn();
    render(<VideoPlayer posterSrc="" videoSrc="" isActive isMuted />);
    fireEvent(screen.getByTestId('video'), new Event('loadeddata'));
    vi.runAllTimers();

    expect(screen.getByTestId<HTMLVideoElement>('video').play).toBeCalledTimes(
      1
    );
  });
});
