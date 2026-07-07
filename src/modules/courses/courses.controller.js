const coursesService = require("./courses.service");
const {
  createCourseSchema,
  updateCourseSchema,
} = require("./courses.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createCourse = asyncHandler(async (req, res) => {
  const { error } = createCourseSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const course = await coursesService.createCourse(req.body);

  return ApiResponse.created(
    res,
    course,
    "Course created successfully."
  );
});

exports.getAllCourses = asyncHandler(async (req, res) => {
  const courses = await coursesService.getAllCourses();

  return ApiResponse.success(
    res,
    courses,
    "Courses retrieved successfully."
  );
});

exports.getCourseById = asyncHandler(async (req, res) => {
  const course = await coursesService.getCourseById(req.params.id);

  return ApiResponse.success(
    res,
    course,
    "Course retrieved successfully."
  );
});

exports.updateCourse = asyncHandler(async (req, res) => {
  const { error } = updateCourseSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const course = await coursesService.updateCourse(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    course,
    "Course updated successfully."
  );
});

exports.deleteCourse = asyncHandler(async (req, res) => {
  await coursesService.deleteCourse(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Course deleted successfully."
  );
});