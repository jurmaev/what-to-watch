import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Genres, GenresValues, Namespace } from '../../const';
import { GenreProcess } from '../../types/state';

const initialState: GenreProcess = {
  genre: Genres.All,
};

export const genreProcess = createSlice({
  name: Namespace.Genre,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<GenresValues>) => {
      state.genre = action.payload;
    },
  },
});

export const { changeGenre } = genreProcess.actions;
