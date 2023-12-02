import { internet } from 'faker';
import { AuthorizationStatus } from '../../const';
import { userProcess } from './user-process';
import { checkAuth, login, logout } from '../api-actions';

describe('User process slice', () => {
  it('sets Auth and avatarUrl with checkAuth.fulfilled action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      avatarUrl: '',
    };

    const expectedUrl = internet.url();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      avatarUrl: expectedUrl,
    };
    const result = userProcess.reducer(
      initialState,
      checkAuth.fulfilled(expectedUrl, '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('sets NoAuth with checkAuth.rejected action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      avatarUrl: '',
    };
    const result = userProcess.reducer(initialState, checkAuth.rejected);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('sets Auth and avatarUrl with login.fulfilled action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      avatarUrl: '',
    };

    const expectedUrl = internet.url();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      avatarUrl: expectedUrl,
    };
    const result = userProcess.reducer(
      initialState,
      login.fulfilled(expectedUrl, '', { email: '', password: '' })
    );
    expect(result).toEqual(expectedState);
  });

  it('sets NoAuth with logout.fulfilled action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      avatarUrl: '',
    };
    const result = userProcess.reducer(initialState, logout.fulfilled);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });
});
