import { combineReducers } from 'redux';

import userReducer from './userReducer';
import taskReducer from './taskReducer';
import memberReducer from './memberReducer';
import projectReducer from './projectReducer';

const reducer = combineReducers({
  user: userReducer,
  member: memberReducer,
  project: projectReducer,
  task: taskReducer
});

export default reducer;
