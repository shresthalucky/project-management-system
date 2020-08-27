import express from 'express';

import * as ProjectController from '../controllers/project.controller';
import * as HelperMiddleware from '../middlewares/helper.middlware';
import * as ProjectMiddleware from '../middlewares/project.middleware';
import { permissions } from '../helpers/permission.helper';
import TaskRoutes from '../routes/task.route';

const router = express.Router();

router.use('/:projectId/tasks', ProjectController.getProject, ProjectMiddleware.checkProjectUsers, TaskRoutes);

router.get(
  '/',
  HelperMiddleware.checkPermission('project', permissions.READ),
  // ProjectController.getUserProjects
  ProjectController.getAllProjects
);

router.get(
  '/projectId',
  HelperMiddleware.checkPermission('project', permissions.READ),
  ProjectController.getProject,
  ProjectMiddleware.responseProject
);

router.post('/', HelperMiddleware.checkPermission('project', permissions.CREATE), ProjectController.createProject);

router.delete(
  '/projectId',
  HelperMiddleware.checkPermission('project', permissions.DELETE),
  ProjectController.getProject,
  ProjectMiddleware.checkProjectAssignee,
  ProjectController.deleteProject
);

router.put(
  '/projectId',
  HelperMiddleware.checkPermission('project', permissions.UPDATE),
  ProjectController.getProject,
  ProjectMiddleware.checkProjectAssignee,
  ProjectController.updateProject
);

export default router;
