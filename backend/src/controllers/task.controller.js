import HttpStatus from 'http-status-codes';

import * as UserServices from '../services/user.service';
import * as TaskServices from '../services/task.service';
import { BadRequestError, DatabaseError } from '../helpers/error.helper';
import { roles } from '../helpers/permission.helper';

export async function createTask(req, res, next) {
  try {
    const task = await TaskServices.createTask(req.params.projectId, req.body);

    res.status(HttpStatus.CREATED).json(task);
  } catch (err) {
    next(new DatabaseError('Cannot create task'));
  }
}

export async function getAllTasks(req, res, next) {
  try {
    const tasks = await TaskServices.getAllTasks(req.params.projectId);

    res.status(HttpStatus.OK).json(tasks);
  } catch (err) {
    next(new DatabaseError('Cannot get tasks'));
  }
}

export async function updateTask(req, res, next) {
  try {
    await TaskServices.updateTask(req.params.taskId, req.body);
    const task = await TaskServices.getTask(req.params.taskId);

    res.status(HttpStatus.CREATED).json(task);
  } catch (err) {
    next(new DatabaseError('Cannot update task'));
  }
}

export async function checkValidAssignee(req, res, next) {
  if (req.body.assigneeId) {
    try {
      const user = await UserServices.getUser({ id: req.body.assigneeId });

      if (user['role_id'] === roles.ENGINEER || user['role_id'] === roles.TEAM_LEAD) {
        next();

        return;
      }

      next(new BadRequestError('Task can only be assigned to Team Lead or Engineer'));
    } catch (err) {
      next(new DatabaseError('Cannot assign task'));
    }
  }
  next();
}

export async function deleteTask(req, res, next) {
  try {
    await UserServices.deleteTask(req.params.taskId);

    res.status(HttpStatus.NO_CONTENT).end();
  } catch (err) {
    next(new DatabaseError('Cannot delete task'));
  }
}
