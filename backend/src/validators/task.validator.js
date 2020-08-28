import JoiMain from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiMain.extend(JoiDate);

const taskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(1).max(500).required(),
  deadline: Joi.date().format('YYYY-MM-DD').required(),
  taggedUsers: Joi.array().items(Joi.number()),
  assigneeId: Joi.number()
});

export default taskSchema;
