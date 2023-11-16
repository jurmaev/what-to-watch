export const AppRoutes = {
  Main: '/',
  Login: '/login',
  MyList: '/mylist',
  Movie: '/films/:id',
  Review: '/films/:id/review',
  Player: '/player/:id',
} as const;

export type AppRoutesValues = (typeof AppRoutes)[keyof typeof AppRoutes];

export const AuthorizationStatus = {
  Auth: 'Auth',
  NoAuth: 'NoAuth',
  Unknown: 'Unknown',
} as const;

export type AuthorizationStatusValues =
  (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus];

export const Genres = {
  All: 'All',
  Comedy: 'Comedy',
  Crime: 'Crime',
  Documentary: 'Documentary',
  Drama: 'Drama',
  Horror: 'Horror',
  KidsFamily: 'KidsFamily',
  Romance: 'Romance',
  SciFi: 'SciFi',
  Thrillers: 'Thrillers',
} as const;

export type GenresValues = (typeof Genres)[keyof typeof Genres];

export const MINUTES = 60;

export const ApiRoute = {
  Films: '/films',
  Login: '/login',
  Reviews: '/comments',
  Promo: '/promo',
} as const;
