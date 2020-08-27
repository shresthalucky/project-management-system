import bookshelf from '../db';

import Task from './task.model';

const Comment = bookshelf.model('Comment', {
  tableName: 'comment',
  hasTimestamps: true,
  task() {
    return this.belongsTo('Task', 'project_id');
  }
});

export default Comment;
