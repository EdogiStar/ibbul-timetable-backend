const timeSlotsService = require("./time-slots.service");

const {
  createTimeSlotSchema,
  updateTimeSlotSchema,
} = require("./time-slots.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

/**
 * Create Time Slot
 */
exports.createTimeSlot = asyncHandler(async (req, res) => {
  const { error } =
    createTimeSlotSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const timeSlot =
    await timeSlotsService.createTimeSlot(req.body);

  return ApiResponse.created(
    res,
    timeSlot,
    "Time slot created successfully."
  );
});

/**
 * Get All Time Slots
 */
exports.getAllTimeSlots = asyncHandler(async (req, res) => {
  const timeSlots =
    await timeSlotsService.getAllTimeSlots();

  return ApiResponse.success(
    res,
    timeSlots,
    "Time slots retrieved successfully."
  );
});

/**
 * Get Time Slot By ID
 */
exports.getTimeSlotById = asyncHandler(async (req, res) => {
  const timeSlot =
    await timeSlotsService.getTimeSlotById(req.params.id);

  return ApiResponse.success(
    res,
    timeSlot,
    "Time slot retrieved successfully."
  );
});

/**
 * Update Time Slot
 */
exports.updateTimeSlot = asyncHandler(async (req, res) => {
  const { error } =
    updateTimeSlotSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const timeSlot =
    await timeSlotsService.updateTimeSlot(
      req.params.id,
      req.body
    );

  return ApiResponse.success(
    res,
    timeSlot,
    "Time slot updated successfully."
  );
});

/**
 * Delete Time Slot
 */
exports.deleteTimeSlot = asyncHandler(async (req, res) => {
  await timeSlotsService.deleteTimeSlot(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Time slot deleted successfully."
  );
});