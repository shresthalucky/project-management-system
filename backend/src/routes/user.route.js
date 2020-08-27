import express from 'express';

import * as UserController from '../controllers/user.controller';
import * as UserMiddleware from '../middlewares/user.middleware';
import * as HelperMiddleware from '../middlewares/helper.middlware';
import { permissions } from '../helpers/permission.helper';
import { validateToken } from '../middlewares/helper.middlware';

const router = express.Router();

// route to register new user
router.post(
  '/register',
  validateToken,
  HelperMiddleware.checkPermission('user', permissions.CREATE),
  UserMiddleware.generatePassword,
  UserController.createUser
);

// route to login user
router.post(
  '/login',
  UserController.getUserByUsername,
  UserMiddleware.validatePassword,
  UserController.getPermissions,
  UserMiddleware.generateToken,
  UserController.loginUser
);

router.put(
  '/:id',
  validateToken,
  HelperMiddleware.checkPermission('user', permissions.UPDATE),
  UserController.getUserById,
  UserMiddleware.validatePassword,
  UserMiddleware.hasNewPassword,
  UserController.updateUser
);

export default router;
