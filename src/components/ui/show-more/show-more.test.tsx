import { render, screen } from '@testing-library/react';
import ShowMore from './show-more';
import userEvent from '@testing-library/user-event';

describe('ShowMore', () => {
  const onClick = vi.fn();
  it('renders when active', () => {
    render(<ShowMore isActive onClick={onClick} />);

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('shows more on click', async () => {
    render(<ShowMore isActive onClick={onClick} />);
    await userEvent.click(screen.getByTestId('showMore'));

    expect(onClick).toBeCalledTimes(1);
  });
});
