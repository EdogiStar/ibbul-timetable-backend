const Joi = require("joi");

const createStudentSchema = Joi.object({
  user_id: Joi.string()
    .uuid()
    .required(),

  programme_id: Joi.string()
    .uuid()
    .required(),

  level_id: Joi.string()
    .uuid()
    .required(),

  matric_number: Joi.string()
    .trim()
    .required(),

  admission_year: Joi.number()
    .integer()
    .required(),

  status: Joi.string()
    .valid("ACTIVE", "INACTIVE")
    .default("ACTIVE"),
});

const updateStudentSchema = Joi.object({
  user_id: Joi.string()
    .uuid(),

  programme_id: Joi.string()
    .uuid(),

  level_id: Joi.string()
    .uuid(),

  matric_number: Joi.string()
    .trim(),

  admission_year: Joi.number()
    .integer(),

  status: Joi.string()
    .valid("ACTIVE", "INACTIVE"),
}).min(1);

module.exports = {
  createStudentSchema,
  updateStudentSchema,
};