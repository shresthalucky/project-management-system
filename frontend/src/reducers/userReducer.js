import { SET_USERS, ADD_USER, DISABLE_USER } from '../actions/userActions';
import { LOGOUT_AUTH } from '../actions/authActions';

const INITIAL = {};

function userReducer(state = INITIAL, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        ...action.payload
      };

    case ADD_USER:
      return {
        ...state,
        [action.payload.id]: action.payload
      }

    case DISABLE_USER:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          active: false
        }
      }

    case LOGOUT_AUTH:
      return INITIAL;

    default:
      return state;
  }
}

export default userReducer;
