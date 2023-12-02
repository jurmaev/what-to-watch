import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('renders when active', () => {
    render(<Spinner isActive />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('doesn\'t render when inactive', () => {
    render(<Spinner isActive={false} />);

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
