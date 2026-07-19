const daysService = require("./days.service");

const {
  createDaySchema,
  updateDaySchema,
} = require("./days.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

/**
 * Create Day
 */
exports.createDay = asyncHandler(async (req, res) => {
  const { error } = createDaySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const day = await daysService.createDay(req.body);

  return ApiResponse.created(
    res,
    day,
    "Day created successfully."
  );
});

/**
 * Get All Days
 */
exports.getAllDays = asyncHandler(async (req, res) => {
  const days = await daysService.getAllDays();

  return ApiResponse.success(
    res,
    days,
    "Days retrieved successfully."
  );
});

/**
 * Get Day By ID
 */
exports.getDayById = asyncHandler(async (req, res) => {
  const day = await daysService.getDayById(req.params.id);

  return ApiResponse.success(
    res,
    day,
    "Day retrieved successfully."
  );
});

/**
 * Update Day
 */
exports.updateDay = asyncHandler(async (req, res) => {
  const { error } = updateDaySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const day = await daysService.updateDay(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    day,
    "Day updated successfully."
  );
});

/**
 * Delete Day
 */
exports.deleteDay = asyncHandler(async (req, res) => {
  await daysService.deleteDay(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Day deleted successfully."
  );
});