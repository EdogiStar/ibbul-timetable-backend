const programmesService = require("./programmes.service");
const {
  createProgrammeSchema,
  updateProgrammeSchema,
} = require("./programmes.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createProgramme = asyncHandler(async (req, res) => {
  const { error } = createProgrammeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const programme = await programmesService.createProgramme(req.body);

  return ApiResponse.created(
    res,
    programme,
    "Programme created successfully."
  );
});

exports.getAllProgrammes = asyncHandler(async (req, res) => {
  const programmes = await programmesService.getAllProgrammes();

  return ApiResponse.success(
    res,
    programmes,
    "Programmes retrieved successfully."
  );
});

exports.getProgrammeById = asyncHandler(async (req, res) => {
  const programme = await programmesService.getProgrammeById(req.params.id);

  return ApiResponse.success(
    res,
    programme,
    "Programme retrieved successfully."
  );
});

exports.updateProgramme = asyncHandler(async (req, res) => {
  const { error } = updateProgrammeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const programme = await programmesService.updateProgramme(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    programme,
    "Programme updated successfully."
  );
});

exports.deleteProgramme = asyncHandler(async (req, res) => {
  await programmesService.deleteProgramme(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Programme deleted successfully."
  );
});