import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { movieProcess } from './movie-process/movie-process';
import { userProcess } from './user-process/user-process';
import { genreProcess } from './genre-process/genre-process';
import { reviewsProcess } from './reviews-process/reviews-process';

export const rootReducer = combineReducers({
  [NameSpace.Movie]: movieProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Genre]: genreProcess.reducer,
  [NameSpace.Reviews]: reviewsProcess.reducer,
});
