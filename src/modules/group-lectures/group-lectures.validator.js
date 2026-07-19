const Joi = require("joi");

const createGroupLectureSchema = Joi.object({
  course_id: Joi.string()
    .uuid()
    .required(),

  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  is_active: Joi.boolean()
    .default(true),
});

const updateGroupLectureSchema = Joi.object({
  course_id: Joi.string()
    .uuid(),

  name: Joi.string()
    .trim()
    .min(2)
    .max(100),

  is_active: Joi.boolean(),
}).min(1);

module.exports = {
  createGroupLectureSchema,
  updateGroupLectureSchema,
};