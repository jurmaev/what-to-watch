import { Genres, Namespace } from '../../const';
import { getGenre } from './selectors';

describe('Genre process selectors', () => {
  const state = {
    [Namespace.Genre]: { genre: Genres.All },
  };

  it('should return genre from state', () => {
    const { genre } = state[Namespace.Genre];
    const result = getGenre(state);
    expect(result).toBe(genre);
  });
});
