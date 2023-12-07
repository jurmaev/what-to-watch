import { render, screen } from '@testing-library/react';
import PlayButton from './play-button';
import { withHistory } from '../../../services/mocks';

describe('Play Button', () => {
  it('renders correctly', () => {
    render(withHistory(<PlayButton id="1" />));

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });
});
