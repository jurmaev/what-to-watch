import { createAction } from '@reduxjs/toolkit';
import { Genres } from '../const';
import { MoviePreviews } from '../types/movies';

export const filterByGenre = createAction<string>('movies/filter');

export const changeGenre = createAction<string>('genre/change');

export const fillMovies = createAction<MoviePreviews>('movies/fill');
