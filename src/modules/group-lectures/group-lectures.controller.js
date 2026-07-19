const groupLecturesService = require("./group-lectures.service");
const {
  createGroupLectureSchema,
  updateGroupLectureSchema,
} = require("./group-lectures.validator");

class GroupLecturesController {
  async create(req, res, next) {
    try {
      const { error, value } =
        createGroupLectureSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const groupLecture =
        await groupLecturesService.createGroupLecture(value);

      return res.status(201).json({
        success: true,
        message: "Group lecture created successfully.",
        data: groupLecture,
      });
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const groupLectures =
        await groupLecturesService.getAllGroupLectures();

      return res.status(200).json({
        success: true,
        data: groupLectures,
      });
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const groupLecture =
        await groupLecturesService.getGroupLectureById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: groupLecture,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { error, value } =
        updateGroupLectureSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const groupLecture =
        await groupLecturesService.updateGroupLecture(
          req.params.id,
          value
        );

      return res.status(200).json({
        success: true,
        message: "Group lecture updated successfully.",
        data: groupLecture,
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await groupLecturesService.deleteGroupLecture(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message: "Group lecture deleted successfully.",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new GroupLecturesController();