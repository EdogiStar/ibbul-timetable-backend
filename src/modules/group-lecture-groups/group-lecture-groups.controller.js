const groupLectureGroupsService = require("./group-lecture-groups.service");

const {
  createGroupLectureGroupSchema,
  updateGroupLectureGroupSchema,
} = require("./group-lecture-groups.validator");

class GroupLectureGroupsController {
  async create(req, res, next) {
    try {
      const { error, value } =
        createGroupLectureGroupSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const group =
        await groupLectureGroupsService.createGroup(value);

      return res.status(201).json({
        success: true,
        message:
          "Group lecture group created successfully.",
        data: group,
      });
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const groups =
        await groupLectureGroupsService.getAllGroups();

      return res.status(200).json({
        success: true,
        data: groups,
      });
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const group =
        await groupLectureGroupsService.getGroupById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: group,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { error, value } =
        updateGroupLectureGroupSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const group =
        await groupLectureGroupsService.updateGroup(
          req.params.id,
          value
        );

      return res.status(200).json({
        success: true,
        message:
          "Group lecture group updated successfully.",
        data: group,
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await groupLectureGroupsService.deleteGroup(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Group lecture group deleted successfully.",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new GroupLectureGroupsController();