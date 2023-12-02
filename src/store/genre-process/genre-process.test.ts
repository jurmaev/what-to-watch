import { Genres } from '../../const';
import { changeGenre, genreProcess } from './genre-process';

describe('Genre process slice', () => {
  it('changes genre with changeGenre action', () => {
    const initialState = { genre: Genres.All };
    const expectedGenre = Genres.Comedy;
    const result = genreProcess.reducer(
      initialState,
      changeGenre(Genres.Comedy)
    );
    expect(result.genre).toBe(expectedGenre);
  });
});
