const Joi = require("joi");

const createCourseAllocationSchema = Joi.object({
  course_offering_id: Joi.string()
    .uuid()
    .required(),

  lecturer_id: Joi.string()
    .uuid()
    .required(),
});

const updateCourseAllocationSchema = Joi.object({
  course_offering_id: Joi.string()
    .uuid(),

  lecturer_id: Joi.string()
    .uuid(),
}).min(1);

module.exports = {
  createCourseAllocationSchema,
  updateCourseAllocationSchema,
};