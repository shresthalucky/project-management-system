import bookshelf from '../db';

import Role from './role.model';
import Permission from './role.model';
import Project from './project.model';
import ProjectUser from './projectUser.model';

const User = bookshelf.model('User', {
  tableName: 'user',
  hasTimestamps: true,
  role() {
    return this.belongsTo('Role');
  },
  permission() {
    return this.belongsTo('Permission', 'role_id', 'role_id');
  },
  projects() {
    return this.belongsToMany('Project', 'project_user', 'project_id', 'user_id');
  }
});

export default User;
