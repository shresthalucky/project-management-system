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
    req.loggedUser = decoded;
    req.loggedUser.token = token;
    next();
  });
}

export function checkPermission(type, action) {
  return (req, res, next) => {
    if (req.loggedUser.permissions[type].includes(action)) {
      next();

      return;
    }
    next(new UnauthorizedError('Unauthorized'));
  };
}

/**
 * Validate request body.
 *
 * @param {Object} schema
 * @returns {Function} Middleware.
 */
export function requestValidator(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      next(new BadRequestError(err.message));
    }
  };
}
