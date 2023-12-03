import { render, screen } from '@testing-library/react';
import PlayButton from './play-button';
import { withHistory } from '../../../services/mocks';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

describe('Play Button', () => {
  it('renders correctly', () => {
    render(withHistory(<PlayButton id="1" />));

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('navigates to player on click', async () => {
    const mockHistory = createMemoryHistory();

    render(withHistory(<PlayButton id="1" />, mockHistory));
    await userEvent.click(screen.getByRole('button'));

    expect(mockHistory.location.pathname).toBe('/player/1');
  });
});
