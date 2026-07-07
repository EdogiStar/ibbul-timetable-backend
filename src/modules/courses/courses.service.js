const coursesRepository = require("./courses.repository");

class CoursesService {
  async createCourse(payload) {
    return await coursesRepository.create(payload);
  }

  async getAllCourses() {
    return await coursesRepository.findAll();
  }

  async getCourseById(id) {
    const course = await coursesRepository.findById(id);

    if (!course) {
      throw new Error("Course not found.");
    }

    return course;
  }

  async updateCourse(id, payload) {
    return await coursesRepository.update(id, payload);
  }

  async deleteCourse(id) {
    return await coursesRepository.delete(id);
  }
}

module.exports = new CoursesService();