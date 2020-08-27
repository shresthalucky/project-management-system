import Project from '../models/project.model';
import User from '../models/user.model';

export function createProject(data) {
  return new Project({
    name: data.name,
    description: data.description,
    project_manager_id: data.projectManagerId
  })
    .save()
    .then((project) => project.serialize());
}

export function deleteProject(id) {
  return new Project().where({ id }).destroy();
}

export function updateProject(id, data) {
  const { usersId } = data;

  return new Project()
    .where({ id })
    .save(
      {
        name: data.name,
        description: data.description,
        project_manager_id: data.projectManagerId
      },
      { patch: true }
    )
    .then((project) => {
      if (usersId) {
        project.users().attach(usersId.map((u) => User.forge({ id: u })));
      }

      return;
    });
}

export function getUserProjects(userId) {
  return new User()
    .where({ id: userId })
    .fetch({
      withRelated: ['projects']
    })
    .then((user) => user.related('projects').serialize({ omitPivot: true }));
}

export function getAllProjects() {
  return new Project()
    .fetchAll({
      withRelated: [
        {
          users: (qb) => {
            qb.column('id', 'username', 'role_id');
          }
        }
      ]
    })
    .then((projects) => projects.serialize({ omitPivot: true }));
}

export function getProject(id) {
  return new Project()
    .where({ id })
    .fetch({
      withRelated: [
        {
          users: (qb) => {
            qb.column('id', 'username', 'role_id');
          }
        }
      ]
    })
    .then((project) => project.serialize({ omitPivot: true }));
}
