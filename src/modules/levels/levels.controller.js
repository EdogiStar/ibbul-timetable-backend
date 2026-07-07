const levelsService = require("./levels.service");
const {
  createLevelSchema,
  updateLevelSchema,
} = require("./levels.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createLevel = asyncHandler(async (req, res) => {
  const { error } = createLevelSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const level = await levelsService.createLevel(req.body);

  return ApiResponse.created(
    res,
    level,
    "Level created successfully."
  );
});

exports.getAllLevels = asyncHandler(async (req, res) => {
  const levels = await levelsService.getAllLevels();

  return ApiResponse.success(
    res,
    levels,
    "Levels retrieved successfully."
  );
});

exports.getLevelById = asyncHandler(async (req, res) => {
  const level = await levelsService.getLevelById(req.params.id);

  return ApiResponse.success(
    res,
    level,
    "Level retrieved successfully."
  );
});

exports.updateLevel = asyncHandler(async (req, res) => {
  const { error } = updateLevelSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const level = await levelsService.updateLevel(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    level,
    "Level updated successfully."
  );
});

exports.deleteLevel = asyncHandler(async (req, res) => {
  await levelsService.deleteLevel(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Level deleted successfully."
  );
});