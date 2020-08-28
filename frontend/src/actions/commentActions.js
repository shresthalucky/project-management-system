export const SET_COMMENTS_LIST = 'SET_COMMENTS_LIST';

export const setCommentsList = (taskId, comments) => ({
  type: SET_COMMENTS_LIST,
  payload: { taskId, comments }
});
