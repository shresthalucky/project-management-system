import Comment from '../models/comment.model';

export function getComment(id) {
  return new Comment()
    .where({ id })
    .fetch()
    .then((comment) => comment.serialize());
}

export function getAllComments(taskId) {
  return new Comment()
    .where({ task_id: taskId })
    .fetchAll()
    .then((comments) => comments.serialize());
}

export function createComment(taskId, data, userId) {
  return new Comment({
    text: data.text,
    task_id: taskId,
    user_id: userId
  })
    .save()
    .then((comment) => comment.serialize());
}

export function updateComment(id, text) {
  return new Comment()
    .where({ id })
    .save(
      {
        text: text
      },
      { patch: true }
    )
    .then((comment) => comment.serialize());
}

export function deleteComment(id) {
  return new Comment().where({ id }).destroy();
}
