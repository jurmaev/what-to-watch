import { render, screen } from '@testing-library/react';
import {
  extractActionTypes,
  makeFakeStore,
  withHistory,
  withStore,
} from '../../services/mocks';
import LoginPage from './login-page';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { ApiRoute, AppRoutes } from '../../const';
import { login } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';

describe('LoginPage', () => {
  it('renders correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginPage />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('types in email field', async () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginPage />),
      makeFakeStore()
    );
    const expectedText = 'test@gmail.com';

    render(withStoreComponent);
    await userEvent.type(
      screen.getByPlaceholderText('Email address'),
      expectedText
    );

    expect(screen.getByDisplayValue(expectedText)).toBeInTheDocument();
  });

  it('types in password field', async () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginPage />),
      makeFakeStore()
    );
    const expectedText = 'password123';

    render(withStoreComponent);
    await userEvent.type(screen.getByPlaceholderText('Password'), expectedText);

    expect(screen.getByDisplayValue(expectedText)).toBeInTheDocument();
  });

  it('displays email error', async () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginPage />),
      makeFakeStore()
    );
    const expectedEmail = 'wrongEmail';
    const expectedPassword = 'password123';

    render(withStoreComponent);
    await userEvent.type(
      screen.getByPlaceholderText('Email address'),
      expectedEmail
    );
    await userEvent.type(
      screen.getByPlaceholderText('Password'),
      expectedPassword
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByDisplayValue(expectedEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPassword)).toBeInTheDocument();
    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeInTheDocument();
  });

  it('displays password error', async () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginPage />),
      makeFakeStore()
    );
    const expectedEmail = 'test@gmail.com';
    const expectedPassword = '123';

    render(withStoreComponent);
    await userEvent.type(
      screen.getByPlaceholderText('Email address'),
      expectedEmail
    );
    await userEvent.type(
      screen.getByPlaceholderText('Password'),
      expectedPassword
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByDisplayValue(expectedEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPassword)).toBeInTheDocument();
    expect(
      screen.getByText(
        'Password should contain at least one letter and one number'
      )
    ).toBeInTheDocument();
  });

  it('logs in user and redirects to main page', async () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistory(<LoginPage />),
      makeFakeStore()
    );
    const expectedEmail = 'test@gmail.com';
    const expectedPassword = 'password123';

    render(withStoreComponent);
    mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, { avatarUrl: '' });
    await userEvent.type(
      screen.getByPlaceholderText('Email address'),
      expectedEmail
    );
    await userEvent.type(
      screen.getByPlaceholderText('Password'),
      expectedPassword
    );
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionTypes(mockStore.getActions());

    expect(mockHistory.location.pathname).toBe(AppRoutes.Main);
    expect(actions).toEqual([
      login.pending.type,
      redirectToRoute.type,
      login.fulfilled.type,
    ]);
  });
});
