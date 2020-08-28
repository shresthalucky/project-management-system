import { combineReducers } from 'redux';

import authReducer from './authReducer';
import taskReducer from './taskReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import commentReducer from './commentReducer';

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  project: projectReducer,
  task: taskReducer,
  comment: commentReducer
});

export default reducer;
