const Joi = require("joi");

const createGroupParticipantSchema = Joi.object({
  group_id: Joi.string()
    .uuid()
    .required(),

  programme_id: Joi.string()
    .uuid()
    .required(),
});

const updateGroupParticipantSchema = Joi.object({
  group_id: Joi.string()
    .uuid(),

  programme_id: Joi.string()
    .uuid(),
}).min(1);

module.exports = {
  createGroupParticipantSchema,
  updateGroupParticipantSchema,
};