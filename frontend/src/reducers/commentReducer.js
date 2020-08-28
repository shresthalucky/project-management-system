import { SET_COMMENTS_LIST } from '../actions/commentActions';
import { LOGOUT_USER } from '../actions/userActions';

const INITIAL = {
  commentsList: {}
};

function taskReducer(state = INITIAL, action) {
  switch (action.type) {
    case SET_COMMENTS_LIST:
      return {
        ...state,
        commentsList: {
          ...state.commentsList,
          [action.payload.taskId]: [...action.payload.comments]
        }
      };

    case LOGOUT_USER:
      return INITIAL;

    default:
      return state;
  }
}

export default taskReducer;
