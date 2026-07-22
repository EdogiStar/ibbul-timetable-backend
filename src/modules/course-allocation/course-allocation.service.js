const courseAllocationRepository = require("./course-allocation.repository");

class CourseAllocationService {
  async createCourseAllocation(payload) {
    return await courseAllocationRepository.create(payload);
  }

  async getAllCourseAllocations() {
    return await courseAllocationRepository.findAll();
  }
  
  /**
 * ----------------------------------------------------
 * Available Course Allocations
 * ----------------------------------------------------
 */
async getAvailableCourseAllocations() {

  return await courseAllocationRepository.findAvailable();

}

  async getCourseAllocationById(id) {
    const allocation = await courseAllocationRepository.findById(id);

    if (!allocation) {
      throw new Error("Course allocation not found.");
    }

    return allocation;
  }

  async updateCourseAllocation(id, payload) {
    return await courseAllocationRepository.update(id, payload);
  }

  async deleteCourseAllocation(id) {
    return await courseAllocationRepository.delete(id);
  }
}

module.exports = new CourseAllocationService();