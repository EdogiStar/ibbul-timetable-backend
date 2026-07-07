const venuesService = require("./venues.service");
const {
  createVenueSchema,
  updateVenueSchema,
} = require("./venues.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createVenue = asyncHandler(async (req, res) => {
  const { error } = createVenueSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const venue = await venuesService.createVenue(req.body);

  return ApiResponse.created(
    res,
    venue,
    "Venue created successfully."
  );
});

exports.getAllVenues = asyncHandler(async (req, res) => {
  const venues = await venuesService.getAllVenues();

  return ApiResponse.success(
    res,
    venues,
    "Venues retrieved successfully."
  );
});

exports.getVenueById = asyncHandler(async (req, res) => {
  const venue = await venuesService.getVenueById(req.params.id);

  return ApiResponse.success(
    res,
    venue,
    "Venue retrieved successfully."
  );
});

exports.updateVenue = asyncHandler(async (req, res) => {
  const { error } = updateVenueSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const venue = await venuesService.updateVenue(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    venue,
    "Venue updated successfully."
  );
});

exports.deleteVenue = asyncHandler(async (req, res) => {
  await venuesService.deleteVenue(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Venue deleted successfully."
  );
});