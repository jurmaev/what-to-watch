import { render, screen } from '@testing-library/react';
import MyListButton from './my-list-button';
import {
  extractActionTypes,
  makeFakeStore,
  withHistory,
  withStore,
} from '../../../services/mocks';
import { postFavoriteStatus } from '../../../store/api-actions';
import userEvent from '@testing-library/user-event';
import { ApiRoute, AuthorizationStatus, Namespace } from '../../../const';

describe('MyListButton', () => {
  it('renders correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MyListButton id="1" isFavorite category="movie" />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('shows in list svg if movie is in my list', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MyListButton id="1" isFavorite category="movie" />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId('inList')).toBeInTheDocument();
  });

  it('shows add svg if movie is not in my list', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MyListButton id="1" isFavorite={false} category="movie" />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId('add')).toBeInTheDocument();
  });

  it('changes favorite status on click', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistory(<MyListButton id="1" isFavorite={false} category="movie" />),
      makeFakeStore({
        [Namespace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          avatarUrl: '',
        },
      })
    );

    render(withStoreComponent);
    mockAxiosAdapter.onPost(`${ApiRoute.MyList}/1/1`).reply(200);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionTypes(mockStore.getActions());

    expect(actions).toEqual([
      postFavoriteStatus.pending.type,
      postFavoriteStatus.fulfilled.type,
    ]);
  });
});
