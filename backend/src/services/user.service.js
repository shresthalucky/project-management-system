import User from '../models/user.model';

export function createUser(data) {
  return new User({
    username: data.username,
    password: data.passwordHash,
    role_id: data.roleId
  })
    .save()
    .then((user) => user.serialize());
}

export function getPermissions(id) {
  return new User()
    .where({ id })
    .fetch({ withRelated: ['permission'] })
    .then((user) => user.related('permission').serialize());
}

export function getUser(data) {
  return new User()
    .where(data)
    .fetch()
    .then((user) => user.serialize());
}

export function updateUser(id, data) {
  return new User({ id })
    .save(
      {
        username: data.username,
        password: data.passwordHash,
        role_id: data.roleId
      },
      { patch: true }
    )
    .then((user) => user.serialize());
}
