export const SET_PROJECTS_LIST = 'SET_PROJECTS_LIST';
export const SET_PROJECTS_DETAIL = 'SET_PROJECT_DETAIL';

export const setProjectsList = (projects) => ({
  type: SET_PROJECTS_LIST,
  payload: projects
});

export const setProjectsDetail = (project) => ({
  type: SET_PROJECTS_DETAIL,
  payload: project
});
