import { combineReducers } from 'redux';

import userReducer from './userReducer';
import taskReducer from './taskReducer';
import memberReducer from './memberReducer';
import projectReducer from './projectReducer';
import commentReducer from './commentReducer';

const reducer = combineReducers({
  user: userReducer,
  member: memberReducer,
  project: projectReducer,
  task: taskReducer,
  comment: commentReducer
});

export default reducer;
