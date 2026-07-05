const facultiesService = require("./faculties.service");
const {
  createFacultySchema,
  updateFacultySchema,
} = require("./faculties.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createFaculty = asyncHandler(async (req, res) => {
  const { error } = createFacultySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const faculty = await facultiesService.createFaculty(req.body);

  return ApiResponse.created(
    res,
    faculty,
    "Faculty created successfully."
  );
});

exports.getAllFaculties = asyncHandler(async (req, res) => {
  const faculties = await facultiesService.getAllFaculties();

  return ApiResponse.success(
    res,
    faculties,
    "Faculties retrieved successfully."
  );
});

exports.getFacultyById = asyncHandler(async (req, res) => {
  const faculty = await facultiesService.getFacultyById(req.params.id);

  return ApiResponse.success(
    res,
    faculty,
    "Faculty retrieved successfully."
  );
});

exports.updateFaculty = asyncHandler(async (req, res) => {
  const { error } = updateFacultySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const faculty = await facultiesService.updateFaculty(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    faculty,
    "Faculty updated successfully."
  );
});

exports.deleteFaculty = asyncHandler(async (req, res) => {
  await facultiesService.deleteFaculty(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Faculty deleted successfully."
  );
});