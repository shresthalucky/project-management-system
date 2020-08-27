import express from 'express';

import * as CommentController from '../controllers/comment.controller';
import * as HelperMiddleware from '../middlewares/helper.middlware';
import { permissions } from '../helpers/permission.helper';
import { validateToken } from '../middlewares/helper.middlware';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  validateToken,
  HelperMiddleware.checkPermission('comment', permissions.READ),
  CommentController.getAllComments
);

router.post(
  '/',
  validateToken,
  HelperMiddleware.checkPermission('comment', permissions.CREATE),
  CommentController.createComment
);

router.put(
  '/:id',
  validateToken,
  HelperMiddleware.checkPermission('comment', permissions.UPDATE),
  CommentController.checkCommentOwner,
  CommentController.updateComment
);

router.delete(
  '/:id',
  validateToken,
  HelperMiddleware.checkPermission('comment', permissions.DELETE),
  CommentController.checkCommentOwner,
  CommentController.deleteComment
);

export default router;
