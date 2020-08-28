import HttpStatus from 'http-status-codes';

import { roles } from '../helpers/permission.helper';
import { UnauthorizedError } from '../helpers/error.helper';

export function responseProject(req, res) {
  res.status(HttpStatus.OK).json(req.project);
}

export function checkProjectAssignee(req, res, next) {
  if (req.loggedUser.roleId === roles.ADMIN || req.project['project_manager_id'] === req.user.id) {
    next();

    return;
  }

  next(new UnauthorizedError());
}

export function checkProjectUsers(req, res, next) {
  if (
    req.loggedUser.roleId === roles.ADMIN ||
    req.project['project_manager_id'] === req.loggedUser.id ||
    req.project.users.some((user) => user.id === req.loggedUser.id)
  ) {
    next();

    return;
  }

  next(new UnauthorizedError());
}
