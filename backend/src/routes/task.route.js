import express from 'express';

import * as TaskController from '../controllers/task.controller';
import * as HelperMiddleware from '../middlewares/helper.middlware';
import CommentRoutes from '../routes/comment.route';
import { permissions } from '../helpers/permission.helper';
import { validateToken } from '../middlewares/helper.middlware';

const router = express.Router({ mergeParams: true });

router.use('/:taskId/comments', CommentRoutes);

router.get('/', validateToken, HelperMiddleware.checkPermission('task', permissions.READ), TaskController.getAllTasks);

router.post(
  '/',
  validateToken,
  HelperMiddleware.checkPermission('task', permissions.CREATE),
  TaskController.checkValidAssignee,
  TaskController.createTask
);

router.put(
  '/:taskId',
  validateToken,
  HelperMiddleware.checkPermission('task', permissions.UPDATE),
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
