type ValueOf<T> = T[keyof T];

export const AppRoutes = {
  Main: '/',
  Login: '/login',
  MyList: '/mylist',
  Movie: '/films/:id',
  Review: '/films/:id/review',
  Player: '/player/:id',
} as const;

export type AppRoutesValues = ValueOf<typeof AppRoutes>;

export const AuthorizationStatus = {
  Auth: 'Auth',
  NoAuth: 'NoAuth',
  Unknown: 'Unknown',
} as const;

export type AuthorizationStatusValues = ValueOf<typeof AuthorizationStatus>;

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

export type GenresValues = ValueOf<typeof Genres>;

export const MINUTES = 60;

export const ApiRoute = {
  Films: '/films',
  Login: '/login',
  Reviews: '/comments',
  Promo: '/promo',
  MyList: '/favorite',
} as const;

export const NameSpace = {
  User: 'user',
  Movie: 'movie',
  Genre: 'genre',
  Data: 'data',
  Reviews: 'reviews',
} as const;
