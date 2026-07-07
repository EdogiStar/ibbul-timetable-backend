const Joi = require("joi");

const createVenueSchema = Joi.object({
  faculty_id: Joi.string()
    .uuid()
    .required(),

  venue_code: Joi.string()
    .trim()
    .min(2)
    .max(20)
    .required(),

  venue_name: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .required(),

  capacity: Joi.number()
    .integer()
    .min(1)
    .required(),

  venue_type: Joi.string()
    .valid(
      "Lecture Hall",
      "Classroom",
      "Laboratory"
    )
    .required(),
});

const updateVenueSchema = Joi.object({
  faculty_id: Joi.string()
    .uuid(),

  venue_code: Joi.string()
    .trim()
    .min(2)
    .max(20),

  venue_name: Joi.string()
    .trim()
    .min(2)
    .max(150),

  capacity: Joi.number()
    .integer()
    .min(1),

  venue_type: Joi.string()
    .valid(
      "Lecture Hall",
      "Classroom",
      "Laboratory"
    ),
}).min(1);

module.exports = {
  createVenueSchema,
  updateVenueSchema,
};