import { createAction } from '@reduxjs/toolkit';
import { GenresValues } from '../const';

export const changeGenre = createAction<GenresValues>('genre/change');

export const fillMovies = createAction('movies/fill');
