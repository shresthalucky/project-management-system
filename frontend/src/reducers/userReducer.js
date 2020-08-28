import { SET_USERS } from '../actions/userActions';
import { LOGOUT_AUTH } from '../actions/authActions';

const INITIAL = {
  users: []
};

function userReducer(state = INITIAL, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: [...action.payload]
      };

    case LOGOUT_AUTH:
      return INITIAL;

    default:
      return state;
  }
}

export default userReducer;
