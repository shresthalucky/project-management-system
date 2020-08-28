import { SET_COMMENTS_LIST } from '../actions/commentActions';
import { LOGOUT_AUTH } from '../actions/authActions';

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

    case LOGOUT_AUTH:
      return INITIAL;

    default:
      return state;
  }
}

export default taskReducer;
