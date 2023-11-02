import { createAction } from '@reduxjs/toolkit';
import { GenresValues } from '../const';

export const filterByGenre = createAction<GenresValues>('movies/filter');

export const changeGenre = createAction<GenresValues>('genre/change');

export const fillMovies = createAction('movies/fill');
