import { GenresValues, Namespace } from '../../const';
import { State } from '../../types/state';

export const getGenre = (state: Pick<State, typeof Namespace.Genre>): GenresValues =>
  state[Namespace.Genre].genre;
