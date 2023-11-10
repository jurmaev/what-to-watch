const TOKEN_KEY = 'what-to-whatch-token';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ?? '';
};

export const setToken = (token: Token): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const deleteToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
