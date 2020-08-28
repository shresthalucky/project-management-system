import { SET_COMMENTS_LIST } from '../actions/commentActions';

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

    default:
      return state;
  }
}

export default taskReducer;
