import { createAction } from '@reduxjs/toolkit';

export const filterByGenre = createAction<string>('movies/filter');

export const changeGenre = createAction<string>('genre/change');

export const fillMovies = createAction('movies/fill');
