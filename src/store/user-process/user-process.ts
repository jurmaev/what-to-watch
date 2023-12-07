import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, Namespace } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuth, login, logout } from '../api-actions';
import { deleteToken } from '../../services/token';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  avatarUrl: '',
};

export const userProcess = createSlice({
  name: Namespace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.avatarUrl = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        deleteToken();
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.avatarUrl = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        deleteToken();
      });
  },
});
