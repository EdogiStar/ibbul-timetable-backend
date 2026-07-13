const Joi = require("joi");

const createLecturerSchema = Joi.object({
  department_id: Joi.string()
    .uuid()
    .required(),

  full_name: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .required(),

  staff_id: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required(),

  max_hours_per_day: Joi.number()
    .integer()
    .min(1)
    .max(24)
    .optional(),
});

const updateLecturerSchema = Joi.object({
  department_id: Joi.string()
    .uuid(),

  full_name: Joi.string()
    .trim()
    .min(2)
    .max(150),

  staff_id: Joi.string()
    .trim()
    .min(2)
    .max(50),

  max_hours_per_day: Joi.number()
    .integer()
    .min(1)
    .max(24),
}).min(1);

module.exports = {
  createLecturerSchema,
  updateLecturerSchema,
};