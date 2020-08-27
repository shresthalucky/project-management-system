import bookshelf from '../db';

const Permission = bookshelf.model('Permission', {
  tableName: 'permission'
});

export default Permission;
