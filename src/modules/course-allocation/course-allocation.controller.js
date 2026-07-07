const courseAllocationService = require("./course-allocation.service");
const {
  createCourseAllocationSchema,
  updateCourseAllocationSchema,
} = require("./course-allocation.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createCourseAllocation = asyncHandler(async (req, res) => {
  const { error } = createCourseAllocationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const allocation = await courseAllocationService.createCourseAllocation(req.body);

  return ApiResponse.created(
    res,
    allocation,
    "Course allocation created successfully."
  );
});

exports.getAllCourseAllocations = asyncHandler(async (req, res) => {
  const allocations = await courseAllocationService.getAllCourseAllocations();

  return ApiResponse.success(
    res,
    allocations,
    "Course allocations retrieved successfully."
  );
});

exports.getCourseAllocationById = asyncHandler(async (req, res) => {
  const allocation = await courseAllocationService.getCourseAllocationById(
    req.params.id
  );

  return ApiResponse.success(
    res,
    allocation,
    "Course allocation retrieved successfully."
  );
});

exports.updateCourseAllocation = asyncHandler(async (req, res) => {
  const { error } = updateCourseAllocationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const allocation = await courseAllocationService.updateCourseAllocation(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    allocation,
    "Course allocation updated successfully."
  );
});

exports.deleteCourseAllocation = asyncHandler(async (req, res) => {
  await courseAllocationService.deleteCourseAllocation(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Course allocation deleted successfully."
  );
});