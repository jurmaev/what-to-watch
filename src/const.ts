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
