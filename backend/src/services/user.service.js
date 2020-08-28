import User from '../models/user.model';

export function getAllUsers() {
  return new User()
    .fetchAll({
      withRelated: ['role'],
      columns: ['id', 'username', 'active', 'role_id']
    })
    .then((users) => users.serialize());
}

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

export function getUser(data, columns) {
  return new User()
    .where(data)
    .fetch({
      withRelated: ['role'],
      columns: columns
    })
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
