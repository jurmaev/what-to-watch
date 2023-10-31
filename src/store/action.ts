import { createAction } from '@reduxjs/toolkit';
import { Genres } from '../const';
import { Movies } from '../types/movies';

export const filterByGenre = createAction<keyof typeof Genres>('movies/filter');

export const changeGenre = createAction<keyof typeof Genres>('genre/change');

export const fillMovies = createAction<Movies>('movies/fill');
