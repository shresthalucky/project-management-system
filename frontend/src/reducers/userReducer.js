import { SET_USER, LOGOUT_USER } from '../actions/userActions';

const INITIAL = {};

function userReducer(state = INITIAL, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      };

    case LOGOUT_USER:
      return INITIAL;

    default:
      return state;
  }
}

export default userReducer;
