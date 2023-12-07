import { render, screen } from '@testing-library/react';
import MyListPage from './my-list-page';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';

describe('MyListPage', () => {
  it('renders correctly', () => {
    const { withStoreComponent } = withStore(withHistory(<MyListPage />), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});
