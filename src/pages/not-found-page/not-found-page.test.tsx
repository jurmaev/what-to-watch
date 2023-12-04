import { render, screen } from '@testing-library/react';
import { withHistory } from '../../services/mocks';
import NotFoundPage from './not-found-page';

describe('NotFoundPage', () => {
  it('renders correctly', () => {
    render(withHistory(<NotFoundPage />));

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
