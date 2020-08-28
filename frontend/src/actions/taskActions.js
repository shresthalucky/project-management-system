export const SET_TASKS_LIST = 'SET_TASKS_LIST';
export const SET_TASKS_DETAIL = 'SET_TASKS_DETAIL';
export const SET_PROJECT_TASKS_LIST = 'SET_PROJECT_TASKS_LIST';

export const setTasksList = (tasks) => ({
  type: SET_TASKS_LIST,
  payload: tasks
});

export const setTasksDetail = (task) => ({
  type: SET_TASKS_DETAIL,
  payload: task
});

export const setProjectTasksList = (projectId, projectTasks) => ({
  type: SET_PROJECT_TASKS_LIST,
  payload: { projectId, projectTasks }
});