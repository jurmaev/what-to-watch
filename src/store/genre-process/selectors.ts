import { GenresValues, Namespace } from '../../const';
import { State } from '../../types/state';

export const getGenre = (state: State): GenresValues =>
  state[Namespace.Genre].genre;
