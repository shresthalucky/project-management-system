import Joi from '@hapi/joi';

const projectSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(1).max(500),
  projectManagerId: Joi.number()
});

export default projectSchema;
