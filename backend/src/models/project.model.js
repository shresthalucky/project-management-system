import bookshelf from '../db';

import User from './user.model';
import ProjectUser from './projectUser.model';

const Project = bookshelf.model('Project', {
  tableName: 'project',
  hasTimestamps: true,
  projectManager() {
    return this.belongsTo('User', 'project_manager_id');
  },
  users() {
    return this.belongsToMany('User', 'project_user', 'project_id', 'user_id');
  }
});

export default Project;
