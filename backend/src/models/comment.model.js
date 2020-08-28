import bookshelf from '../db';

import User from './user.model';
import Task from './task.model';

const Comment = bookshelf.model('Comment', {
  tableName: 'comment',
  hasTimestamps: true,
  task() {
    return this.belongsTo('Task', 'project_id');
  },
  user() {
    return this.belongsTo('User', 'user_id');
  }
});

export default Comment;
