const courseOfferingsRepository = require("./course-offerings.repository");

class CourseOfferingsService {
  async createCourseOffering(payload) {
    return await courseOfferingsRepository.create(payload);
  }

  async getAllCourseOfferings() {
    return await courseOfferingsRepository.findAll();
  }

  async getCourseOfferingById(id) {
    const offering = await courseOfferingsRepository.findById(id);

    if (!offering) {
      throw new Error("Course offering not found.");
    }

    return offering;
  }

  async updateCourseOffering(id, payload) {
    return await courseOfferingsRepository.update(id, payload);
  }

  async deleteCourseOffering(id) {
    return await courseOfferingsRepository.delete(id);
  }
}

module.exports = new CourseOfferingsService();