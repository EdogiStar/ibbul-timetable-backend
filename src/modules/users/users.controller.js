const usersService = require("./users.service");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const { createUserSchema } = require("./users.validation");

exports.createUser = asyncHandler(async (req, res) => {
  const { error } = createUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const user = await usersService.createUser(req.body);

  return ApiResponse.created(
    res,
    user,
    "User created successfully."
  );
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await usersService.getAllUsers();

  return ApiResponse.success(
    res,
    users,
    "Users retrieved successfully."
  );
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);

  return ApiResponse.success(
    res,
    user,
    "User retrieved successfully."
  );
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await usersService.updateUser(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    user,
    "User updated successfully."
  );
});

exports.deleteUser = asyncHandler(async (req, res) => {
  await usersService.deleteUser(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "User deleted successfully."
  );
});