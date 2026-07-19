const timetableService = require("./timetable.service");

const {
  createTimetableSchema,
  updateTimetableSchema,
} = require("./timetable.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

/**
 * Generate Group Timetable
 */
exports.generateGroupTimetable = asyncHandler(async (req, res) => {
  const timetable =
    await timetableService.generateGroupTimetable();

  return ApiResponse.created(
    res,
    timetable,
    "Group timetable generated successfully."
  );
});

/**
 * Generate Normal Timetable
 */
exports.generateNormalTimetable = asyncHandler(async (req, res) => {
  const timetable =
    await timetableService.generateNormalTimetable();

  return ApiResponse.created(
    res,
    timetable,
    "Normal timetable generated successfully."
  );
});

/**
 * Generate Complete Timetable
 */
exports.generateTimetable = asyncHandler(async (req, res) => {

  const timetable =
    await timetableService.generateTimetable();

  return ApiResponse.created(
    res,
    timetable,
    "Timetable generated successfully."
  );

});

/**
 * Create Timetable Entry
 */
exports.createTimetable = asyncHandler(async (req, res) => {
  const { error } =
    createTimetableSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const timetable =
    await timetableService.createTimetable(req.body);

  return ApiResponse.created(
    res,
    timetable,
    "Timetable entry created successfully."
  );
});

/**
 * Get All Timetable Entries
 */
exports.getAllTimetables = asyncHandler(async (req, res) => {
  const timetables =
    await timetableService.getAllTimetables(req.query);

  return ApiResponse.success(
    res,
    timetables,
    "Timetable entries retrieved successfully."
  );
});

/**
 * Get Timetable Entry
 */
exports.getTimetableById = asyncHandler(async (req, res) => {
  const timetable =
    await timetableService.getTimetableById(req.params.id);

  return ApiResponse.success(
    res,
    timetable,
    "Timetable entry retrieved successfully."
  );
});

/**
 * Update Timetable Entry
 */
exports.updateTimetable = asyncHandler(async (req, res) => {
  const { error } =
    updateTimetableSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const timetable =
    await timetableService.updateTimetable(
      req.params.id,
      req.body
    );

  return ApiResponse.success(
    res,
    timetable,
    "Timetable entry updated successfully."
  );
});

/**
 * Delete Timetable Entry
 */
exports.deleteTimetable = asyncHandler(async (req, res) => {
  await timetableService.deleteTimetable(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Timetable entry deleted successfully."
  );
});