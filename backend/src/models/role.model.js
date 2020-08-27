import bookshelf from '../db';

import Permission from './permission.model';

const Role = bookshelf.model('Role', {
  tableName: 'role',
  users() {
    return this.hasMany('User');
  },
  permission() {
    return this.hasOne('Permission');
  }
});

export default Role;
