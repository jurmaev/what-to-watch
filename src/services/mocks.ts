import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { createApi } from './api';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createApi>,
  Action
>;

export const extractActionTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);
