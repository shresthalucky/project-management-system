import express from 'express';

import { permissions } from '../helpers/permission.helper';
import commentSchema from '../validators/comment.validator';
import * as HelperMiddleware from '../middlewares/helper.middlware';
import * as CommentController from '../controllers/comment.controller';
import { validateToken, requestValidator } from '../middlewares/helper.middlware';

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
  requestValidator(commentSchema),
  CommentController.createComment
);

router.put(
  '/:id',
  validateToken,
  HelperMiddleware.checkPermission('comment', permissions.UPDATE),
  requestValidator(commentSchema),
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
