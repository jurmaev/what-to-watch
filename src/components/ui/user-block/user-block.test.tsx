import { render, screen } from '@testing-library/react';
import UserBlock from './user-block';
import {
  extractActionTypes,
  makeFakeStore,
  withHistory,
  withStore,
} from '../../../services/mocks';
import { ApiRoute, AuthorizationStatus, Namespace } from '../../../const';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { logout } from '../../../store/api-actions';
import { clearMyList } from '../../../store/movie-process/movie-process';

describe('UserBlock', () => {
  it('renders avatar when authorized', () => {
    const { withStoreComponent } = withStore(withHistory(<UserBlock />), {
      [Namespace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        avatarUrl: '',
      },
    });

    render(withStoreComponent);

    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('logs out when sign out is clicked', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistory(<UserBlock />),
      {
        [Namespace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          avatarUrl: '',
        },
      }
    );

    render(withStoreComponent);
    mockAxiosAdapter.onDelete(ApiRoute.Login).reply(200);
    await userEvent.click(screen.getByTestId('logOut'));
    const actions = extractActionTypes(mockStore.getActions());

    expect(actions).toEqual([
      logout.pending.type,
      clearMyList.type,
      logout.fulfilled.type,
    ]);
  });

  it('renders sign in link when unauthorized', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      withHistory(<UserBlock />, mockHistory),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
