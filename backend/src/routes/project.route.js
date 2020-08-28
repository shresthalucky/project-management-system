import express from 'express';

import TaskRoutes from '../routes/task.route';
import { permissions } from '../helpers/permission.helper';
import projectSchema from '../validators/project.validator';
import * as HelperMiddleware from '../middlewares/helper.middlware';
import * as ProjectController from '../controllers/project.controller';
import * as ProjectMiddleware from '../middlewares/project.middleware';
import { validateToken, requestValidator } from '../middlewares/helper.middlware';

const router = express.Router();

router.use('/:projectId/tasks', ProjectController.getProject, ProjectMiddleware.checkProjectUsers, TaskRoutes);

router.get(
  '/',
  validateToken,
  HelperMiddleware.checkPermission('project', permissions.READ),
  // ProjectController.getUserProjects
  ProjectController.getAllProjects
);

router.get(
  '/:projectId',
  validateToken,
  HelperMiddleware.checkPermission('project', permissions.READ),
  ProjectController.getProject,
  ProjectMiddleware.responseProject
);

router.post(
  '/',
  requestValidator(projectSchema),
  validateToken,
  HelperMiddleware.checkPermission('project', permissions.CREATE),
  ProjectController.createProject
);

router.delete(
  '/:projectId',
  validateToken,
  HelperMiddleware.checkPermission('project', permissions.DELETE),
  ProjectController.getProject,
  ProjectMiddleware.checkProjectAssignee,
  ProjectController.deleteProject
);

router.put(
  '/:projectId',
  validateToken,
  HelperMiddleware.checkPermission('project', permissions.UPDATE),
  ProjectController.getProject,
  ProjectMiddleware.checkProjectAssignee,
  ProjectController.updateProject
);

export default router;
