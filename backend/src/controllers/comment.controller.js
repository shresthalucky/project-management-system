import HttpStatus from 'http-status-codes';

import * as CommentServices from '../services/comment.service';
import { UnauthorizedError } from '../helpers/error.helper';

export async function createComment(req, res, next) {
  try {
    const comment = await CommentServices.createComment(req.params.taskId, req.body, req.user.id);

    res.status(HttpStatus.CREATED).json(comment);
  } catch (err) {
    console.log(err);
  }
}

export async function getAllComments(req, res, next) {
  try {
    const comments = await CommentServices.getAllComments(req.params.taskId);

    res.status(HttpStatus.OK).json(comments);
  } catch (err) {
    console.log(err);
  }
}

export async function updateComment(req, res, next) {
  try {
    const comment = await CommentServices.updateComment(req.params.id, req.body.text);

    res.status(HttpStatus.CREATED).json(comment);
  } catch (err) {
    console.log(err);
  }
}

export async function checkCommentOwner(req, res, next) {
  try {
    const comment = await CommentServices.getComment(req.params.id);

    if (comment['user_id'] === req.user.id) {
      next();

      return;
    }
    next(new UnauthorizedError());
  } catch (err) {
    console.log(err);
  }
}

export async function deleteComment(req, res, next) {
  try {
    await CommentServices.deleteComment(req.params.id);

    res.status(HttpStatus.NO_CONTENT).end();
  } catch (err) {
    console.log(err);
  }
}
