const Joi = require("joi");

const createUserSchema = Joi.object({
  code: Joi.string().required(),

  full_name: Joi.string().min(3).max(100).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(8).required(),

  role_id: Joi.string().uuid().required(),

  phone: Joi.string().allow(null, ""),

  staff_number: Joi.string().allow(null, ""),

  matric_number: Joi.string().allow(null, ""),

  status: Joi.string()
    .valid("ACTIVE", "INACTIVE")
    .default("ACTIVE"),
});

module.exports = {
  createUserSchema,
};