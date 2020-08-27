import Task from '../models/task.model';
import User from '../models/user.model';

export function getTask(id) {
  return new Task()
    .where({ id })
    .fetch({
      withRelated: [
        {
          taggedUsers: (qb) => {
            qb.column('id', 'username', 'role_id');
          }
        }
      ]
    })
    .then((task) => task.serialize({ omitPivot: true }));
}

export function getAllTasks(projectId) {
  return new Task()
    .where({ project_id: projectId })
    .fetchAll()
    .then((tasks) => tasks.serialize());
}

export function createTask(projectId, data) {
  return new Task({
    title: data.title,
    description: data.description,
    deadline: data.deadline,
    project_id: projectId
  })
    .save()
    .then((task) => task.serialize());
}

export function updateTask(taskId, data) {
  const { taggedUsers } = data;

  return new Task()
    .where({ id: taskId })
    .fetch()
    .then((task) => {
      const prevAssigneeId =
        task.get('assignee_id') === data.assigneeId || !data.assigneeId
          ? task.get('prev_assignee_id')
          : task.get('assignee_id');

      return task.save(
        {
          title: data.title,
          description: data.description,
          deadline: data.deadline,
          prev_assignee_id: prevAssigneeId,
          assignee_id: data.assigneeId
        },
        { patch: true }
      );
    })
    .then((task) => {
      if (taggedUsers) {
        task.taggedUsers().attach(taggedUsers.map((u) => User.forge({ id: u })));
      }

      return;
    });
}

export function deleteTask(taskId) {
  return new Task().where({ id: taskId }).destroy();
}
