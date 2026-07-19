const Joi = require("joi");

const createGroupLectureGroupSchema = Joi.object({
  group_lecture_id: Joi.string()
    .uuid()
    .required(),

  group_name: Joi.string()
    .trim()
    .min(2)
    .max(30)
    .required(),

  lecturer_id: Joi.string()
    .uuid()
    .allow(null)
    .optional(),

  venue_id: Joi.string()
    .uuid()
    .allow(null)
    .optional(),
});

const updateGroupLectureGroupSchema = Joi.object({
  group_lecture_id: Joi.string()
    .uuid(),

  group_name: Joi.string()
    .trim()
    .min(2)
    .max(30),

  lecturer_id: Joi.string()
    .uuid()
    .allow(null),

  venue_id: Joi.string()
    .uuid()
    .allow(null),
}).min(1);

module.exports = {
  createGroupLectureGroupSchema,
  updateGroupLectureGroupSchema,
};