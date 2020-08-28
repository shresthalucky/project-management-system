import { SET_MEMBERS, ADD_MEMBER } from '../actions/memberActions';
import { LOGOUT_USER } from '../actions/userActions';

const INITIAL = {
  isLoading: true,
  users: []
};

function memberReducer(state = INITIAL, action) {
  switch (action.type) {
    case SET_MEMBERS:
      return {
        ...state,
        users: [...action.payload],
        isLoading: false
      };

    case ADD_MEMBER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };

    case LOGOUT_USER:
      return INITIAL;

    default:
      return state;
  }
}

export default memberReducer;
