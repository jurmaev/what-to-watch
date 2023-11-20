import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../action';
import { browserHistory } from '../../services/browser-history';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === redirectToRoute.toString()) {
      browserHistory.push(action.payload);
    }
    return next(action);
  };
