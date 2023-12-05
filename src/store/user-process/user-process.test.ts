import { internet } from 'faker';
import { AuthorizationStatus } from '../../const';
import { userProcess } from './user-process';
import { checkAuth, login, logout } from '../api-actions';

describe('User process slice', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    avatarUrl: '',
  };

  describe('checkAuth', () => {
    it('sets Auth and avatarUrl with fulfilled action', () => {
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

    it('sets NoAuth with rejected action', () => {
      const result = userProcess.reducer(initialState, checkAuth.rejected);
      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    });
  });

  describe('login', () => {
    it('sets Auth and avatarUrl with fulfilled action', () => {
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
  });

  describe('logout', () => {
    it('sets NoAuth with fulfilled action', () => {
      const result = userProcess.reducer(initialState, logout.fulfilled);
      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    });
  });
});
