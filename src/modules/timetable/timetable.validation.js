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

  faculty_id: Joi.string()
    .uuid()
    .required(),

  venue_id: Joi.string()
    .uuid()
    .allow(null),

  programme_id: Joi.string()
    .uuid()
    .required(),

  level_id: Joi.string()
    .uuid()
    .required(),

  session_id: Joi.string()
    .uuid()
    .required(),

  semester_id: Joi.string()
    .uuid()
    .required(),

  day_id: Joi.string()
    .uuid()
    .required(),

  time_slot_id: Joi.string()
    .uuid()
    .required(),

  course_allocation_id: Joi.string()
    .uuid()
    .allow(null),

  group_lecture_id: Joi.string()
    .uuid()
    .allow(null),

  session_number: Joi.number()
    .integer()
    .min(1),

  is_group: Joi.boolean()
    .default(false),

  is_locked: Joi.boolean()
    .default(false),
});

const updateTimetableSchema = Joi.object({
  course_id: Joi.string().uuid(),

  lecturer_id: Joi.string().uuid().allow(null),

  department_id: Joi.string().uuid(),

  faculty_id: Joi.string().uuid(),

  venue_id: Joi.string().uuid().allow(null),

  programme_id: Joi.string().uuid(),

  level_id: Joi.string().uuid(),

  session_id: Joi.string().uuid(),

  semester_id: Joi.string().uuid(),

  day_id: Joi.string().uuid(),

  time_slot_id: Joi.string().uuid(),

  course_allocation_id: Joi.string()
    .uuid()
    .allow(null),

  group_lecture_id: Joi.string()
    .uuid()
    .allow(null),

  session_number: Joi.number()
    .integer()
    .min(1),

  is_group: Joi.boolean(),

  is_locked: Joi.boolean(),
}).min(1);

module.exports = {
  createTimetableSchema,
  updateTimetableSchema,
};