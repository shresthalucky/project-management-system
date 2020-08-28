import { SET_TASKS_LIST, SET_TASKS_DETAIL, SET_PROJECT_TASKS_LIST } from '../actions/taskActions';
import { LOGOUT_USER } from '../actions/userActions';

const INITIAL = {
  tasksList: [],
  projectTasksList: {},
  tasksDetail: {}
};

function taskReducer(state = INITIAL, action) {
  switch (action.type) {
    case SET_TASKS_LIST:
      return {
        ...state,
        tasksList: [
          ...action.payload
        ]
      };

    case SET_PROJECT_TASKS_LIST:
      return {
        ...state,
        projectTasksList: {
          ...state.projectTasksList,
          [action.payload.projectId]: [...action.payload.projectTasks]
        }
      };

    case SET_TASKS_DETAIL:
      return {
        ...state,
        tasksDetail: {
          ...state.tasksDetail,
          [action.payload['id']]: action.payload
        }
      };

    case LOGOUT_USER:
      return INITIAL;

    default:
      return state;
  }
}

export default taskReducer;
