const studentsRepository = require("./students.repository");

class StudentsService {
  async createStudent(payload) {
    return await studentsRepository.create(payload);
  }

  async getAllStudents() {
    return await studentsRepository.findAll();
  }

  async getStudentById(id) {
    const student = await studentsRepository.findById(id);

    if (!student) {
      throw new Error("Student not found.");
    }

    return student;
  }

  async updateStudent(id, payload) {
    return await studentsRepository.update(id, payload);
  }

  async deleteStudent(id) {
    return await studentsRepository.delete(id);
  }
}

module.exports = new StudentsService();