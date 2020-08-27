import bookshelf from '../db';

const ProjectUser = bookshelf.model('ProjectUser', {
  tableName: 'project_user',
  project() {
    return this.belongsTo('Project');
  },
  user() {
    return this.belongsTo('User');
  }
});

export default ProjectUser;
