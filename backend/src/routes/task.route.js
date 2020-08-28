import express from 'express';

import CommentRoutes from '../routes/comment.route';
import taskValidator from '../validators/task.validator';
import { permissions } from '../helpers/permission.helper';
import * as TaskController from '../controllers/task.controller';
import * as HelperMiddleware from '../middlewares/helper.middlware';
import { validateToken, requestValidator } from '../middlewares/helper.middlware';

const router = express.Router({ mergeParams: true });

router.use('/:taskId/comments', CommentRoutes);

router.get('/', validateToken, HelperMiddleware.checkPermission('task', permissions.READ), TaskController.getAllTasks);

router.get(
  '/:taskId',
  validateToken,
  HelperMiddleware.checkPermission('task', permissions.READ),
  TaskController.getTask
);

router.post(
  '/',
  validateToken,
  HelperMiddleware.checkPermission('task', permissions.CREATE),
  requestValidator(taskValidator),
  TaskController.checkValidAssignee,
  TaskController.createTask
);

router.put(
  '/:taskId',
  validateToken,
  HelperMiddleware.checkPermission('task', permissions.UPDATE),
  requestValidator(taskValidator),
  TaskController.checkValidAssignee,
  TaskController.updateTask
);

router.delete(
  '/:taskId',
  validateToken,
  HelperMiddleware.checkPermission('task', permissions.DELETE),
  TaskController.deleteTask
);

export default router;
