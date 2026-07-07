const Joi = require("joi");

const createTimetableSchema = Joi.object({
  course_id: Joi.string()
    .uuid()
    .required(),

  lecturer_id: Joi.string()
    .uuid()
    .allow(null),

  department_id: Joi.string()
    .uuid()
    .required(),

  venue_id: Joi.string()
    .uuid()
    .allow(null),

  faculty_id: Joi.string()
    .uuid()
    .allow(null),

  day: Joi.string()
    .valid(
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    )
    .required(),

  start_time: Joi.string()
    .required(),

  end_time: Joi.string()
    .required(),

  level: Joi.string()
    .allow("", null),

  semester: Joi.string()
    .valid("First", "Second")
    .default("First"),

  academic_session: Joi.string()
    .allow("", null),

  is_group: Joi.boolean()
    .default(false),

  group_lecture_id: Joi.string()
    .uuid()
    .allow(null),

  is_locked: Joi.boolean()
    .default(false),
});

const updateTimetableSchema = Joi.object({
  course_id: Joi.string().uuid(),

  lecturer_id: Joi.string().uuid().allow(null),

  department_id: Joi.string().uuid(),

  venue_id: Joi.string().uuid().allow(null),

  faculty_id: Joi.string().uuid().allow(null),

  day: Joi.string().valid(
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ),

  start_time: Joi.string(),

  end_time: Joi.string(),

  level: Joi.string().allow("", null),

  semester: Joi.string().valid("First", "Second"),

  academic_session: Joi.string().allow("", null),

  is_group: Joi.boolean(),

  group_lecture_id: Joi.string().uuid().allow(null),

  is_locked: Joi.boolean(),
}).min(1);

module.exports = {
  createTimetableSchema,
  updateTimetableSchema,
};