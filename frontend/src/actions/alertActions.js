export const SET_ERROR_ALERT = 'SET_ERROR_ALERT';
export const SET_SUCCESS_ALERT = 'SET_SUCCESS_ALERT';
export const UNSET_ALERT = 'UNSET_ALERT';

export const setErrorAlert = (message) => ({
  type: SET_ERROR_ALERT,
  payload: message
});

export const setSuccessAlert = (message) => ({
  type: SET_SUCCESS_ALERT,
  payload: message
});

export const unsetAlert = () => ({
  type: UNSET_ALERT
});
