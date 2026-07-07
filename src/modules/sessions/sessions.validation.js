const Joi = require("joi");

const createSessionSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required(),

  is_current: Joi.boolean()
    .default(false),

  status: Joi.string()
    .valid("ACTIVE", "INACTIVE")
    .default("ACTIVE"),
});

const updateSessionSchema = Joi.object({
  name: Joi.string().trim(),

  is_current: Joi.boolean(),

  status: Joi.string()
    .valid("ACTIVE", "INACTIVE"),
}).min(1);

module.exports = {
  createSessionSchema,
  updateSessionSchema,
};