import { Genres } from '../../const';
import { changeGenre, genreProcess } from './genre-process';

describe('Genre process slice', () => {
  it('should return initital state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { genre: Genres.Comedy };
    const result = genreProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const empttyActon = { type: '' };
    const expectedState = { genre: Genres.All };
    const result = genreProcess.reducer(undefined, empttyActon);
    expect(result).toEqual(expectedState);
  });

  it('should change genre with "changeGenre" action', () => {
    const initialState = { genre: Genres.All };
    const expectedGenre = Genres.Comedy;
    const result = genreProcess.reducer(
      initialState,
      changeGenre(Genres.Comedy)
    );
    expect(result.genre).toBe(expectedGenre);
  });
});
