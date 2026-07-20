const Joi = require("joi");

const createDaySchema = Joi.object({
  code: Joi.string()
    .trim()
    .min(3)
    .max(10)
    .required(),

  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required(),

  sort_order: Joi.number()
    .integer()
    .min(1)
    .required(),
});

const updateDaySchema = Joi.object({
  code: Joi.string()
    .trim()
    .min(3)
    .max(10),

  name: Joi.string()
    .trim()
    .min(3)
    .max(50),

  sort_order: Joi.number()
    .integer()
    .min(1),
}).min(1);

module.exports = {
  createDaySchema,
  updateDaySchema,
};