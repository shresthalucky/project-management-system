export const SET_AUTH = 'SET_AUTH';
export const LOGOUT_AUTH = 'LOGOUT_AUTH';

export const setAuth = (user) => ({
  type: SET_AUTH,
  payload: user
});

export const logoutAuth = () => ({
  type: LOGOUT_AUTH
});
