import { render, screen } from '@testing-library/react';
import VideoPlayer from './video-player';

describe('VideoPlayer', () => {
  it('renders correctly', () => {
    render(<VideoPlayer posterSrc="" videoSrc="" isActive isMuted />);

    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
});
