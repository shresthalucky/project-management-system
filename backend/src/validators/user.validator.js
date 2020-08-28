import Joi from '@hapi/joi';
import { roles } from '../helpers/permission.helper';

const userSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
  roleId: Joi.number().valid(roles.PROJECT_MANAGER, roles.TEAM_LEAD, roles.ENGINEER),
  newPassword: Joi.string().min(1),
  active: Joi.boolean()
});

export default userSchema;
