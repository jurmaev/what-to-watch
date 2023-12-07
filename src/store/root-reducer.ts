import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../const';
import { movieProcess } from './movie-process/movie-process';
import { userProcess } from './user-process/user-process';
import { genreProcess } from './genre-process/genre-process';
import { reviewsProcess } from './reviews-process/reviews-process';

export const rootReducer = combineReducers({
  [Namespace.Movie]: movieProcess.reducer,
  [Namespace.User]: userProcess.reducer,
  [Namespace.Genre]: genreProcess.reducer,
  [Namespace.Reviews]: reviewsProcess.reducer,
});
