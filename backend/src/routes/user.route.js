import express from 'express';

import * as UserController from '../controllers/user.controller';
import * as UserMiddleware from '../middlewares/user.middleware';
import * as HelperMiddleware from '../middlewares/helper.middlware';
import { permissions } from '../helpers/permission.helper';
import userSchema from '../validators/user.validator';
import { validateToken, requestValidator } from '../middlewares/helper.middlware';

const router = express.Router();

router.get(
  '/',
  validateToken,
  HelperMiddleware.checkPermission('user', permissions.READ),
  UserController.getAllUsers
);

router.delete(
  '/:id',
  validateToken,
  HelperMiddleware.checkPermission('user', permissions.DELETE),
  UserController.deleteUser
);

// route to register new user
router.post(
  '/register',
  validateToken,
  HelperMiddleware.checkPermission('user', permissions.CREATE),
  requestValidator(userSchema),
  UserMiddleware.generatePassword,
  UserController.createUser
);

// route to login user
router.post(
  '/login',
  requestValidator(userSchema),
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
  requestValidator(userSchema),
  UserController.getUserByUsername,
  UserMiddleware.validatePassword,
  UserMiddleware.hasNewPassword,
  UserController.updateUser
);

export default router;
