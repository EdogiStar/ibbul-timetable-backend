const Joi = require("joi");

const createLevelSchema = Joi.object({
  code: Joi.string()
    .trim()
    .min(2)
    .max(20)
    .required(),

  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  level_number: Joi.number()
    .integer()
    .min(100)
    .max(1000)
    .required(),
});

const updateLevelSchema = Joi.object({
  code: Joi.string()
    .trim()
    .min(2)
    .max(20),

  name: Joi.string()
    .trim()
    .min(2)
    .max(100),

  level_number: Joi.number()
    .integer()
    .min(100)
    .max(1000),
}).min(1);

module.exports = {
  createLevelSchema,
  updateLevelSchema,
};