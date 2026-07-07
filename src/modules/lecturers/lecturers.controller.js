const lecturersService = require("./lecturers.service");
const {
  createLecturerSchema,
  updateLecturerSchema,
} = require("./lecturers.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createLecturer = asyncHandler(async (req, res) => {
  const { error } = createLecturerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const lecturer = await lecturersService.createLecturer(req.body);

  return ApiResponse.created(
    res,
    lecturer,
    "Lecturer created successfully."
  );
});

exports.getAllLecturers = asyncHandler(async (req, res) => {
  const lecturers = await lecturersService.getAllLecturers();

  return ApiResponse.success(
    res,
    lecturers,
    "Lecturers retrieved successfully."
  );
});

exports.getLecturerById = asyncHandler(async (req, res) => {
  const lecturer = await lecturersService.getLecturerById(req.params.id);

  return ApiResponse.success(
    res,
    lecturer,
    "Lecturer retrieved successfully."
  );
});

exports.updateLecturer = asyncHandler(async (req, res) => {
  const { error } = updateLecturerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const lecturer = await lecturersService.updateLecturer(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    lecturer,
    "Lecturer updated successfully."
  );
});

exports.deleteLecturer = asyncHandler(async (req, res) => {
  await lecturersService.deleteLecturer(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Lecturer deleted successfully."
  );
});