import { SET_TASKS_LIST, SET_TASKS_DETAIL, SET_PROJECT_TASKS_LIST } from '../actions/taskActions';

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

    default:
      return state;
  }
}

export default taskReducer;
