const departmentsService = require("./departments.service");
const {
  createDepartmentSchema,
  updateDepartmentSchema,
} = require("./departments.validation");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

exports.createDepartment = asyncHandler(async (req, res) => {
  const { error } = createDepartmentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const department = await departmentsService.createDepartment(req.body);

  return ApiResponse.created(
    res,
    department,
    "Department created successfully."
  );
});

exports.getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await departmentsService.getAllDepartments();

  return ApiResponse.success(
    res,
    departments,
    "Departments retrieved successfully."
  );
});

exports.getDepartmentById = asyncHandler(async (req, res) => {
  const department = await departmentsService.getDepartmentById(
    req.params.id
  );

  return ApiResponse.success(
    res,
    department,
    "Department retrieved successfully."
  );
});

exports.updateDepartment = asyncHandler(async (req, res) => {
  const { error } = updateDepartmentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const department = await departmentsService.updateDepartment(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    department,
    "Department updated successfully."
  );
});

exports.deleteDepartment = asyncHandler(async (req, res) => {
  await departmentsService.deleteDepartment(req.params.id);

  return ApiResponse.success(
    res,
    null,
    "Department deleted successfully."
  );
});