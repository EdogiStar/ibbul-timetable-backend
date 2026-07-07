const Joi = require("joi");

const createSemesterSchema = Joi.object({
  code: Joi.string()
    .trim()
    .max(20)
    .required(),

  name: Joi.string()
    .trim()
    .required(),
});

const updateSemesterSchema = Joi.object({
  code: Joi.string()
    .trim()
    .max(20),

  name: Joi.string()
    .trim(),
}).min(1);

module.exports = {
  createSemesterSchema,
  updateSemesterSchema,
};