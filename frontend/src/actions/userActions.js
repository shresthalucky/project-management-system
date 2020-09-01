export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';
export const DISABLE_USER = 'DISABLE_USER';

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});

export const disableUser = (id) => ({
  type: DISABLE_USER,
  payload: { id }
});