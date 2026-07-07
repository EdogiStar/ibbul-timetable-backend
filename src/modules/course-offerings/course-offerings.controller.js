const courseOfferingsService = require("./course-offerings.service");
const {
  createCourseOfferingSchema,
  updateCourseOfferingSchema,
} = require("./course-offerings.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createCourseOffering = asyncHandler(async (req, res) => {
  const { error } = createCourseOfferingSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const offering = await courseOfferingsService.createCourseOffering(req.body);

  return ApiResponse.created(
    res,
    offering,
    "Course offering created successfully."
  );
});

exports.getAllCourseOfferings = asyncHandler(async (req, res) => {
  const offerings = await courseOfferingsService.getAllCourseOfferings();

  return ApiResponse.success(
    res,
    offerings,
    "Course offerings retrieved successfully."
  );
});

exports.getCourseOfferingById = asyncHandler(async (req, res) => {
  const offering = await courseOfferingsService.getCourseOfferingById(
    req.params.id
  );

  return ApiResponse.success(
    res,
    offering,
    "Course offering retrieved successfully."
  );
});

exports.updateCourseOffering = asyncHandler(async (req, res) => {
  const { error } = updateCourseOfferingSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const offering = await courseOfferingsService.updateCourseOffering(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    offering,
    "Course offering updated successfully."
  );
});

exports.deleteCourseOffering = asyncHandler(async (req, res) => {
  await courseOfferingsService.deleteCourseOffering(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Course offering deleted successfully."
  );
});