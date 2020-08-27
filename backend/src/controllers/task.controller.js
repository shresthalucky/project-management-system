import HttpStatus from 'http-status-codes';

import * as UserServices from '../services/user.service';
import * as TaskServices from '../services/task.service';
import { ServerError, BadRequestError } from '../helpers/error.helper';
import { roles } from '../helpers/permission.helper';

export async function createTask(req, res, next) {
  try {
    const task = await TaskServices.createTask(req.params.projectId, req.body);

    res.status(HttpStatus.CREATED).json(task);
  } catch (err) {
    console.log(err);
  }
}

export async function getAllTasks(req, res, next) {
  try {
    const tasks = await TaskServices.getAllTasks(req.params.projectId);

    res.status(HttpStatus.OK).json(tasks);
  } catch (err) {
    console.log(err);
  }
}

export async function updateTask(req, res, next) {
  try {
    await TaskServices.updateTask(req.params.taskId, req.body);
    const task = await TaskServices.getTask(req.params.taskId);

    res.status(HttpStatus.CREATED).json(task);
  } catch (err) {
    console.log(err);
  }
}

export async function checkValidAssignee(req, res, next) {
  if (req.body.assigneeId) {
    try {
      const user = await UserServices.getUser({ id: req.body.assigneeId });

      if (user['role_id'] === roles.PROJECT_MANAGER || user['role_id'] === roles.TEAM_LEAD) {
        next();

        return;
      }

      next(new BadRequestError());
    } catch (err) {
      next(new ServerError());
    }
  }
  next();
}

export async function deleteTask(req, res, next) {
  try {
    await UserServices.deleteTask(req.params.taskId);

    res.status(HttpStatus.NO_CONTENT).end();
  } catch (err) {
    console.log(err);
  }
}
