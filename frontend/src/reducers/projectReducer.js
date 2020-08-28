import { SET_PROJECTS_LIST, SET_PROJECTS_DETAIL } from '../actions/projectActions';

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

    default:
      return state;
  }
}

export default projectReducer;
