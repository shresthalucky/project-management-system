import { SET_PROJECTS_LIST, SET_PROJECTS_DETAIL } from '../actions/projectActions';
import { LOGOUT_USER } from '../actions/userActions';

const INITIAL = {
  projectsList: [],
  projectsDetail: {}
};

function projectReducer(state = INITIAL, action) {
  switch (action.type) {
    case SET_PROJECTS_LIST:
      return {
        ...state,
        projectsList: [
          ...action.payload
        ]
      };

    case SET_PROJECTS_DETAIL:
      return {
        ...state,
        projectsDetail: {
          ...state.projectsDetail,
          [action.payload['id']]: action.payload
        }
      };

    case LOGOUT_USER:
      return INITIAL;

    default:
      return state;
  }
}

export default projectReducer;
