const Joi = require("joi");

const createDepartmentSchema = Joi.object({
  faculty_id: Joi.string()
    .uuid()
    .required(),

  code: Joi.string()
    .trim()
    .min(2)
    .max(20)
    .required(),

  name: Joi.string()
    .trim()
    .min(3)
    .max(150)
    .required(),
});

const updateDepartmentSchema = Joi.object({
  faculty_id: Joi.string()
    .uuid(),

  code: Joi.string()
    .trim()
    .min(2)
    .max(20),

  name: Joi.string()
    .trim()
    .min(3)
    .max(150),
}).min(1);

module.exports = {
  createDepartmentSchema,
  updateDepartmentSchema,
};