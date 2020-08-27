import { combineReducers } from 'redux';

import userReducer from './userReducer';
import memberReducer from './memberReducer';

const reducer = combineReducers({
  user: userReducer,
  member: memberReducer
});

export default reducer;
