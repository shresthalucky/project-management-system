import { SET_AUTH, LOGOUT_AUTH } from '../actions/authActions';

const INITIAL = {};

function authReducer(state = INITIAL, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        ...action.payload
      };

    case LOGOUT_AUTH:
      return INITIAL;

    default:
      return state;
  }
}

export default authReducer;
