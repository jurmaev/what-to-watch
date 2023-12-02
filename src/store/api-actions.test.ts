import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppThunkDispatch, extractActionTypes } from '../services/mocks';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { ApiRoute, Namespace } from '../const';
import {
  checkAuth,
  fetchMovie,
  fetchMoviePreviews,
  fetchMyList,
  fetchPromoMovie,
  fetchReviews,
  fetchSimilarMovies,
  logout,
  postFavoriteStatus,
  postReview,
} from './api-actions';
import { mockMoviePreviews } from '../mocks/movie-previews';
import { internet } from 'faker';
import { mockMovie } from '../mocks/movie';
import { mockPromoMovie } from '../mocks/promo-movie';
import { mockReviews } from '../mocks/reviews';
import { FavoriteStatus } from '../types/movies';
import { mockFavoriteMovie } from '../mocks/favorite-movie';

describe('Api actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [Namespace.Movie]: {
        moviePreviews: [],
        movie: null,
        promoMovie: null,
        myList: [],
        myListLength: 0,
        similarMovies: [],
        isFetchingMovieData: false,
      },
      [Namespace.User]: { avatarUrl: '' },
      [Namespace.Reviews]: { reviews: [] },
    });
  });

  describe('fetchMoviePreviews action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Films).reply(200, mockMoviePreviews);

      await store.dispatch(fetchMoviePreviews());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchMoviePreviewsFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchMoviePreviews.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        fetchMoviePreviews.pending.type,
        fetchMoviePreviews.fulfilled.type,
      ]);
      expect(fetchMoviePreviewsFulfilled.payload).toEqual(mockMoviePreviews);
    });
  });

  describe('checkAuth action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      const expectedUrl = internet.url();
      mockAxiosAdapter
        .onGet(ApiRoute.Login)
        .reply(200, { avatarUrl: expectedUrl });

      await store.dispatch(checkAuth());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const checkAuthFulfilled = emittedActions.at(1) as ReturnType<
        typeof checkAuth.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        checkAuth.pending.type,
        checkAuth.fulfilled.type,
      ]);
      expect(checkAuthFulfilled.payload).toBe(expectedUrl);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(401);

      await store.dispatch(checkAuth());

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.rejected.type,
      ]);
    });
  });

  describe('logout action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Login).reply(204);

      await store.dispatch(logout());

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([logout.pending.type, logout.fulfilled.type]);
    });
  });

  describe('fetchMovie action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter.onGet(`${ApiRoute.Films}/${id}`).reply(200, mockMovie);

      await store.dispatch(fetchMovie(id));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchMovieFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchMovie.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        fetchMovie.pending.type,
        fetchMovie.fulfilled.type,
      ]);
      expect(fetchMovieFulfilled.payload).toEqual(mockMovie);
    });
  });

  describe('fetchPromoMovie action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Promo).reply(200, mockPromoMovie);

      await store.dispatch(fetchPromoMovie());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchPromoMovieFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchPromoMovie.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        fetchPromoMovie.pending.type,
        fetchPromoMovie.fulfilled.type,
      ]);
      expect(fetchPromoMovieFulfilled.payload).toEqual(mockPromoMovie);
    });
  });

  describe('fetchReviews action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter
        .onGet(`${ApiRoute.Reviews}/${id}`)
        .reply(200, mockReviews);

      await store.dispatch(fetchReviews(id));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchReviewsFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchReviews.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type,
      ]);
      expect(fetchReviewsFulfilled.payload).toEqual(mockReviews);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter.onGet(`${ApiRoute.Reviews}/${id}`).reply(404);

      await store.dispatch(fetchReviews(id));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarMovies action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter
        .onGet(`${ApiRoute.Films}/${id}/similar`)
        .reply(200, mockMoviePreviews);

      await store.dispatch(fetchSimilarMovies(id));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchSimilarMoviesFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchSimilarMovies.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        fetchSimilarMovies.pending.type,
        fetchSimilarMovies.fulfilled.type,
      ]);
      expect(fetchSimilarMoviesFulfilled.payload).toEqual(mockMoviePreviews);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter.onGet(`${ApiRoute.Films}/${id}/similar`).reply(404);

      await store.dispatch(fetchSimilarMovies(id));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarMovies.pending.type,
        fetchSimilarMovies.rejected.type,
      ]);
    });
  });

  describe('fetchMyList action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      mockAxiosAdapter.onGet(ApiRoute.MyList).reply(200, mockMoviePreviews);

      await store.dispatch(fetchMyList());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchMyListFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchMyList.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        fetchMyList.pending.type,
        fetchMyList.fulfilled.type,
      ]);
      expect(fetchMyListFulfilled.payload).toEqual(mockMoviePreviews);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      mockAxiosAdapter.onGet(ApiRoute.MyList).reply(401);

      await store.dispatch(fetchMyList());

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchMyList.pending.type,
        fetchMyList.rejected.type,
      ]);
    });
  });

  describe('postFavoriteStatus action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      const id = crypto.randomUUID();
      const favoriteStatus: FavoriteStatus = {
        id: id,
        status: 0,
        category: 'movie',
      };
      mockAxiosAdapter
        .onPost(`${ApiRoute.MyList}/${id}/${favoriteStatus.status}`)
        .reply(200, mockFavoriteMovie);

      await store.dispatch(postFavoriteStatus(favoriteStatus));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const postFavoriteStatusFulfilled = emittedActions.at(1) as ReturnType<
        typeof postFavoriteStatus.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        postFavoriteStatus.pending.type,
        postFavoriteStatus.fulfilled.type,
      ]);
      expect(postFavoriteStatusFulfilled.payload).toEqual(mockFavoriteMovie);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      const id = crypto.randomUUID();
      const favoriteStatus: FavoriteStatus = {
        id: id,
        status: 0,
        category: 'movie',
      };
      mockAxiosAdapter
        .onPost(`${ApiRoute.MyList}/${id}/${favoriteStatus.status}`)
        .reply(400);

      await store.dispatch(postFavoriteStatus(favoriteStatus));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        postFavoriteStatus.pending.type,
        postFavoriteStatus.rejected.type,
      ]);
    });
  });

  describe('postReview action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      const id = crypto.randomUUID();
      const review = { id: id, comment: '', rating: 0 };
      mockAxiosAdapter
        .onPost(`${ApiRoute.Reviews}/${id}`)
        .reply(201, mockReviews[0]);

      await store.dispatch(postReview(review));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.fulfilled.type,
      ]);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      const id = crypto.randomUUID();
      const review = { id: id, comment: '', rating: 0 };

      mockAxiosAdapter.onPost(`${ApiRoute.Reviews}/${id}`).reply(400);

      await store.dispatch(postReview(review));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.rejected.type,
      ]);
    });
  });
});
