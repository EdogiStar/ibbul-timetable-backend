const Joi = require("joi");

const createProgrammeSchema = Joi.object({
  department_id: Joi.string()
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

  duration_years: Joi.number()
    .integer()
    .min(1)
    .max(10)
    .required(),

  status: Joi.string()
    .valid("ACTIVE", "INACTIVE")
    .default("ACTIVE"),
});

const updateProgrammeSchema = Joi.object({
  department_id: Joi.string().uuid(),

  code: Joi.string()
    .trim()
    .min(2)
    .max(20),

  name: Joi.string()
    .trim()
    .min(3)
    .max(150),

  duration_years: Joi.number()
    .integer()
    .min(1)
    .max(10),

  status: Joi.string()
    .valid("ACTIVE", "INACTIVE"),
}).min(1);

module.exports = {
  createProgrammeSchema,
  updateProgrammeSchema,
};