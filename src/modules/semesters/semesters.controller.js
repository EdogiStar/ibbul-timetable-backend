const semestersService = require("./semesters.service");
const {
  createSemesterSchema,
  updateSemesterSchema,
} = require("./semesters.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createSemester = asyncHandler(async (req, res) => {
  const { error } = createSemesterSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const semester = await semestersService.createSemester(req.body);

  return ApiResponse.created(
    res,
    semester,
    "Semester created successfully."
  );
});

exports.getAllSemesters = asyncHandler(async (req, res) => {
  const semesters = await semestersService.getAllSemesters();

  return ApiResponse.success(
    res,
    semesters,
    "Semesters retrieved successfully."
  );
});

exports.getSemesterById = asyncHandler(async (req, res) => {
  const semester = await semestersService.getSemesterById(req.params.id);

  return ApiResponse.success(
    res,
    semester,
    "Semester retrieved successfully."
  );
});

exports.updateSemester = asyncHandler(async (req, res) => {
  const { error } = updateSemesterSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const semester = await semestersService.updateSemester(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    semester,
    "Semester updated successfully."
  );
});

exports.deleteSemester = asyncHandler(async (req, res) => {
  await semestersService.deleteSemester(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Semester deleted successfully."
  );
});