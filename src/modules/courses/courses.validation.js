const Joi = require("joi");

const createCourseSchema = Joi.object({
  department_id: Joi.string()
    .uuid()
    .required(),

  course_code: Joi.string()
    .trim()
    .min(2)
    .max(20)
    .required(),

  course_title: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required(),

  level: Joi.string()
    .trim()
    .valid("100", "200", "300", "400", "500", "600")
    .default("100"),

  semester: Joi.string()
    .valid("First", "Second")
    .default("First"),

  student_count: Joi.number()
    .integer()
    .min(0)
    .default(0),

  sessions_per_week: Joi.number()
    .integer()
    .min(1)
    .default(1),

  hours_per_session: Joi.number()
    .integer()
    .min(1)
    .default(1),

  preferred_venue_type: Joi.string()
    .valid(
      "Lecture Hall",
      "Classroom",
      "Laboratory"
    )
    .default("Lecture Hall"),
});

const updateCourseSchema = Joi.object({
  department_id: Joi.string()
    .uuid(),

  course_code: Joi.string()
    .trim()
    .min(2)
    .max(20),

  course_title: Joi.string()
    .trim()
    .min(2)
    .max(200),

  level: Joi.string()
    .valid("100", "200", "300", "400", "500", "600"),

  semester: Joi.string()
    .valid("First", "Second"),

  student_count: Joi.number()
    .integer()
    .min(0),

  sessions_per_week: Joi.number()
    .integer()
    .min(1),

  hours_per_session: Joi.number()
    .integer()
    .min(1),

  preferred_venue_type: Joi.string()
    .valid(
      "Lecture Hall",
      "Classroom",
      "Laboratory"
    ),
}).min(1);

module.exports = {
  createCourseSchema,
  updateCourseSchema,
};