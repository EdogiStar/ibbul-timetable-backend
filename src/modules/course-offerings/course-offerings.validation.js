const Joi = require("joi");

const createCourseOfferingSchema = Joi.object({
  course_id: Joi.string()
    .uuid()
    .required(),

  programme_id: Joi.string()
    .uuid()
    .required(),

  level_id: Joi.string()
    .uuid()
    .required(),

  session_id: Joi.string()
    .uuid()
    .required(),

  semester_id: Joi.string()
    .uuid()
    .required(),

  is_compulsory: Joi.boolean()
    .default(true),
});

const updateCourseOfferingSchema = Joi.object({
  course_id: Joi.string().uuid(),

  programme_id: Joi.string().uuid(),

  level_id: Joi.string().uuid(),

  session_id: Joi.string().uuid(),

  semester_id: Joi.string().uuid(),

  is_compulsory: Joi.boolean(),
}).min(1);

module.exports = {
  createCourseOfferingSchema,
  updateCourseOfferingSchema,
};