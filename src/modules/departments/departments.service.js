const departmentsRepository = require("./departments.repository");

class DepartmentsService {
  async createDepartment(payload) {
    return await departmentsRepository.create(payload);
  }

  async getAllDepartments() {
    return await departmentsRepository.findAll();
  }

  async getDepartmentById(id) {
    const department = await departmentsRepository.findById(id);

    if (!department) {
      throw new Error("Department not found.");
    }

    return department;
  }

  async updateDepartment(id, payload) {
    return await departmentsRepository.update(id, payload);
  }

  async deleteDepartment(id) {
    return await departmentsRepository.delete(id);
  }
}

module.exports = new DepartmentsService();