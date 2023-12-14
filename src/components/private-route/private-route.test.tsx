import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoutes, AuthorizationStatus, Namespace } from '../../const';
import { withHistory, withStore } from '../../services/mocks';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';
import { internet } from 'faker';

describe('PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoutes.MyList);
  });

  it('renders component for public route, when status does not match', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoutes.Login} element={<span>{expectedText}</span>} />
        <Route
          path={AppRoutes.MyList}
          element={
            <PrivateRoute
              withStatus={AuthorizationStatus.Auth}
              navigateTo={AppRoutes.Login}
            >
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(withHistoryComponent, {
      [Namespace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        avatarUrl: internet.url(),
      },
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('renders component for private route, when status is matched', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const withHistoryComponent = withHistory(
      <Routes>
        <Route
          path={AppRoutes.Login}
          element={<span>{notExpectedText}</span>}
        />
        <Route
          path={AppRoutes.MyList}
          element={
            <PrivateRoute
              withStatus={AuthorizationStatus.Auth}
              navigateTo={AppRoutes.Login}
            >
              <span>{expectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(withHistoryComponent, {
      [Namespace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        avatarUrl: internet.url(),
      },
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
