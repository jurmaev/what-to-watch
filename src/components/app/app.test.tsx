import { MemoryHistory, createMemoryHistory } from 'history';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';
import App from './app';
import { AppRoutes, AuthorizationStatus, Namespace } from '../../const';
import { render, screen } from '@testing-library/react';
import { mockPromoMovie } from '../../mocks/promo-movie';
import { internet } from 'faker';
import { mockMovie } from '../../mocks/movie';

describe('Application routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders MainPage when user navigates to main page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoutes.Main);

    render(withStoreComponent);

    expect(screen.getByAltText(mockPromoMovie.name)).toBeInTheDocument();
    expect(
      screen.getByAltText(`${mockPromoMovie.name} poster`)
    ).toBeInTheDocument();
  });

  it('renders LoginPage whe user navigates to login page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoutes.Login);

    render(withStoreComponent);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders MyListPage when user navigates to mylist', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [Namespace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          avatarUrl: internet.url(),
        },
      })
    );
    mockHistory.push(AppRoutes.MyList);

    render(withStoreComponent);

    expect(screen.getByText('My List')).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('renders MoviePage when user navigates to film page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(`/films/${mockMovie.id}`);

    render(withStoreComponent);

    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genre)).toBeInTheDocument();
    expect(screen.getByText('More like this')).toBeInTheDocument();
  });

  it('renders ReviewPage when user navigates to review page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(`/films/${mockMovie.id}/review`);

    render(withStoreComponent);

    expect(screen.getByAltText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByText(`${mockMovie.name} poster`)).toBeInTheDocument();
  });

  it('renders PlayerPage when user navigates to player page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(`/player/${mockMovie.id}`);

    render(withStoreComponent);

    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
  });

  it('renders NotFoundPage when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push('/unknown');

    render(withStoreComponent);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
