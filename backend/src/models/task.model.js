import bookshelf from '../db';

import User from './user.model';

const Task = bookshelf.model('Task', {
  tableName: 'task',
  hasTimestamps: true,
  projectManager() {
    return this.belongsTo('User', 'project_manager_id');
  },
  taggedUsers() {
    return this.belongsToMany('User', 'task_tagged_user', 'task_id', 'tagged_user_id');
  }
});

export default Task;
