import jwt from 'jsonwebtoken';

import { BadRequestError, UnauthorizedError } from '../helpers/error.helper';

/**
 * Decode JWT with secret key.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function validateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    next(new BadRequestError('Authorization token not provided'));
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      next(new BadRequestError('Invalid Token'));
    }
    req.user = decoded;
    req.user.token = token;
    next();
  });
}

export function checkPermission(type, action) {
  return (req, res, next) => {
    if (req.user.permissions[type].includes(action)) {
      next();

      return;
    }
    next(new UnauthorizedError('Unauthorized'));
  };
}
