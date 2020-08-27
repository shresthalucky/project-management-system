import HttpStatus from 'http-status-codes';

import * as ProjectServices from '../services/project.service';
import { UnauthorizedError } from '../helpers/error.helper';

export async function createProject(req, res, next) {
  try {
    const project = await ProjectServices.createProject(req.body);

    res.status(HttpStatus.CREATED).json(project);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteProject(req, res, next) {
  try {
    await ProjectServices.deleteProject(req.params.projectId);

    res.status(HttpStatus.NO_CONTENT).end();
  } catch (err) {
    console.log(err);
  }
}

export async function updateProject(req, res, next) {
  try {
    await ProjectServices.updateProject(req.params.projectId, req.body);
    const project = await ProjectServices.getProject(req.params.projectId);

    res.status(HttpStatus.ACCEPTED).json(project);
  } catch (err) {
    console.log(err);
  }
}

export async function getUserProjects(req, res, next) {
  try {
    const projects = await ProjectServices.getUserProjects(req.user.id);

    res.status(HttpStatus.OK).json(projects);
  } catch (err) {
    console.log(err);
  }
}

export async function getAllProjects(req, res, next) {
  try {
    const projects = await ProjectServices.getAllProjects();

    res.status(HttpStatus.OK).json(projects);
  } catch (err) {
    console.log(err);
  }
}

export async function getProject(req, res, next) {
  try {
    const project = await ProjectServices.getProject(req.params.projectId);

    req.project = project;
    next();
  } catch (err) {
    console.log(err);
  }
}
