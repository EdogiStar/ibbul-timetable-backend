const studentsService = require("./students.service");
const {
  createStudentSchema,
  updateStudentSchema,
} = require("./students.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createStudent = asyncHandler(async (req, res) => {
  const { error } = createStudentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const student = await studentsService.createStudent(req.body);

  return ApiResponse.created(
    res,
    student,
    "Student created successfully."
  );
});

exports.getAllStudents = asyncHandler(async (req, res) => {
  const students = await studentsService.getAllStudents();

  return ApiResponse.success(
    res,
    students,
    "Students retrieved successfully."
  );
});

exports.getStudentById = asyncHandler(async (req, res) => {
  const student = await studentsService.getStudentById(req.params.id);

  return ApiResponse.success(
    res,
    student,
    "Student retrieved successfully."
  );
});

exports.updateStudent = asyncHandler(async (req, res) => {
  const { error } = updateStudentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const student = await studentsService.updateStudent(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    student,
    "Student updated successfully."
  );
});

exports.deleteStudent = asyncHandler(async (req, res) => {
  await studentsService.deleteStudent(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Student deleted successfully."
  );
});