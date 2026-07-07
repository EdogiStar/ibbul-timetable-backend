const sessionsService = require("./sessions.service");
const {
  createSessionSchema,
  updateSessionSchema,
} = require("./sessions.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createSession = asyncHandler(async (req, res) => {
  const { error } = createSessionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const session = await sessionsService.createSession(req.body);

  return ApiResponse.created(
    res,
    session,
    "Academic session created successfully."
  );
});

exports.getAllSessions = asyncHandler(async (req, res) => {
  const sessions = await sessionsService.getAllSessions();

  return ApiResponse.success(
    res,
    sessions,
    "Academic sessions retrieved successfully."
  );
});

exports.getSessionById = asyncHandler(async (req, res) => {
  const session = await sessionsService.getSessionById(req.params.id);

  return ApiResponse.success(
    res,
    session,
    "Academic session retrieved successfully."
  );
});

exports.updateSession = asyncHandler(async (req, res) => {
  const { error } = updateSessionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const session = await sessionsService.updateSession(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    session,
    "Academic session updated successfully."
  );
});

exports.deleteSession = asyncHandler(async (req, res) => {
  await sessionsService.deleteSession(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Academic session deleted successfully."
  );
});