import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { createApi } from './api';
import { MemoryHistory, createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../components/history-router/history-router';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AuthorizationStatus, Genres, Namespace } from '../const';
import { mockPromoMovie } from '../mocks/promo-movie';
import { mockMovie } from '../mocks/movie';
import { mockMoviePreviews } from '../mocks/movie-previews';
import { mockReviews } from '../mocks/reviews';
import { internet } from 'faker';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createApi>,
  Action
>;

export const extractActionTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>{component}</HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {}
): ComponentWithMockStore {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [Namespace.Movie]: {
    moviePreviews: mockMoviePreviews,
    movie: mockMovie,
    promoMovie: mockPromoMovie,
    myList: mockMoviePreviews,
    myListLength: mockMoviePreviews.length,
    similarMovies: mockMoviePreviews,
    isFetchingMovieData: false,
  },
  [Namespace.Genre]: { genre: Genres.All },
  [Namespace.Reviews]: { reviews: mockReviews, isFetchingReviewsData: false },
  [Namespace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    avatarUrl: internet.url(),
  },
  ...(initialState ?? {}),
});
