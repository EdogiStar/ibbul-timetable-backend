const groupParticipantsService = require("./group-participants.service");

const {
  createGroupParticipantSchema,
  updateGroupParticipantSchema,
} = require("./group-participants.validator");

class GroupParticipantsController {
  async create(req, res, next) {
    try {
      const { error, value } =
        createGroupParticipantSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const participant =
        await groupParticipantsService.createParticipant(
          value
        );

      return res.status(201).json({
        success: true,
        message:
          "Group participant created successfully.",
        data: participant,
      });
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const participants =
        await groupParticipantsService.getAllParticipants();

      return res.status(200).json({
        success: true,
        data: participants,
      });
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const participant =
        await groupParticipantsService.getParticipantById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: participant,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { error, value } =
        updateGroupParticipantSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const participant =
        await groupParticipantsService.updateParticipant(
          req.params.id,
          value
        );

      return res.status(200).json({
        success: true,
        message:
          "Group participant updated successfully.",
        data: participant,
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await groupParticipantsService.deleteParticipant(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Group participant deleted successfully.",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new GroupParticipantsController();