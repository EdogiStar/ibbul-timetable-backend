const Joi = require("joi");

const createTimeSlotSchema = Joi.object({
  code: Joi.string()
    .trim()
    .min(5)
    .max(10)
    .required(),

  start_time: Joi.string()
    .required(),

  end_time: Joi.string()
    .required(),

  sort_order: Joi.number()
    .integer()
    .min(1)
    .required(),
});

const updateTimeSlotSchema = Joi.object({
  code: Joi.string()
    .trim()
    .min(5)
    .max(10),

  start_time: Joi.string(),

  end_time: Joi.string(),

  sort_order: Joi.number()
    .integer()
    .min(1),
}).min(1);

module.exports = {
  createTimeSlotSchema,
  updateTimeSlotSchema,
};