import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { reducer } from '../reducer';
import { redirectToRoute } from '../action';
import { browserHistory } from '../../services/browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === redirectToRoute.toString()) {
      browserHistory.push(action.payload);
    }
    return next(action);
  };
