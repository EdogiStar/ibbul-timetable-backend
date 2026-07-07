const timetableService = require("./timetable.service");
const {
  createTimetableSchema,
  updateTimetableSchema,
} = require("./timetable.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createTimetable = asyncHandler(async (req, res) => {
  const { error } = createTimetableSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const timetable = await timetableService.createTimetable(req.body);

  return ApiResponse.created(
    res,
    timetable,
    "Timetable entry created successfully."
  );
});

exports.getAllTimetables = asyncHandler(async (req, res) => {
  const timetables = await timetableService.getAllTimetables();

  return ApiResponse.success(
    res,
    timetables,
    "Timetable entries retrieved successfully."
  );
});

exports.getTimetableById = asyncHandler(async (req, res) => {
  const timetable = await timetableService.getTimetableById(req.params.id);

  return ApiResponse.success(
    res,
    timetable,
    "Timetable entry retrieved successfully."
  );
});

exports.updateTimetable = asyncHandler(async (req, res) => {
  const { error } = updateTimetableSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const timetable = await timetableService.updateTimetable(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    timetable,
    "Timetable entry updated successfully."
  );
});

exports.deleteTimetable = asyncHandler(async (req, res) => {
  await timetableService.deleteTimetable(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Timetable entry deleted successfully."
  );
});