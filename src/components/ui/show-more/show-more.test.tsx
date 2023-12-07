import { render, screen } from '@testing-library/react';
import ShowMore from './show-more';
import userEvent from '@testing-library/user-event';

describe('ShowMore', () => {
  const onClick = vi.fn();
  const preparedComponent = <ShowMore isActive onClick={onClick} />;

  it('renders when active', () => {
    render(preparedComponent);

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('shows more on click', async () => {
    render(preparedComponent);
    await userEvent.click(screen.getByTestId('showMore'));

    expect(onClick).toBeCalledTimes(1);
  });
});
