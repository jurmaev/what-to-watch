export const AppRoutes = {
  Main: '/',
  Login: '/login',
  MyList: '/mylist',
  Movie: '/films/:id',
  Review: '/films/:id/review',
  Player: '/player/:id',
} as const;

export const AuthorizationStatus = {
  Auth: 'Auth',
  NoAuth: 'NoAuth',
  Unknown: 'Unknown',
} as const;

export const Genres = {
  All: 'all',
  Comedy: 'comedy',
  Crime: 'crime',
  Documentary: 'documentary',
  Drama: 'drama',
  Horror: 'horror',
  KidsFamily: 'KidsFamily',
  Romance: 'romance',
  SciFi: 'scifi',
  Thrillers: 'thrillers',
} as const;
