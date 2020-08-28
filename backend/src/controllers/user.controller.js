import HttpStatus from 'http-status-codes';

import * as UserServices from '../services/user.service';
import { UnauthorizedError } from '../helpers/error.helper';

export async function getAllUsers(req, res, next) {
  try {
    const user = await UserServices.getAllUsers();

    res.status(HttpStatus.OK).json(user);
  } catch (err) {
    console.log(err);
  }
}

export async function getUserByUsername(req, res, next) {
  try {
    const user = await UserServices.getUser({ username: req.body.username }, [
      'id',
      'username',
      'active',
      'role_id',
      'password'
    ]);

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await UserServices.getUser({ id: req.params.id }, ['id', 'username', 'active', 'role_id']);

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
}

export async function getPermissions(req, res, next) {
  try {
    const permissions = await UserServices.getPermissions(req.user.id);

    req.user.permissions = permissions;
    next();
  } catch (err) {
    console.log(err);
  }
}

export function loginUser(req, res, next) {
  res.status(HttpStatus.ACCEPTED).json({
    token: req.user.token,
    id: req.user.id,
    username: req.user.username,
    roleId: req.user.role_id
  });
}

export async function createUser(req, res, next) {
  try {
    const user = await UserServices.createUser(req.body);
    const userRes = await UserServices.getUser({ id: user.id });

    res.status(HttpStatus.CREATED).json(userRes);
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await UserServices.updateUser(req.params.id, req.body);

    res.status(HttpStatus.ACCEPTED).json({
      id: user.id,
      username: user.username,
      roleId: user.role_id,
      active: req.body.active
    });
  } catch (err) {
    console.log(err);
  }
}
