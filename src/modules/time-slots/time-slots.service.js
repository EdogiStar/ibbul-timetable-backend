const timeSlotsRepository = require("./time-slots.repository");

class TimeSlotsService {
  async createTimeSlot(payload) {
    return await timeSlotsRepository.create(payload);
  }

  async getAllTimeSlots() {
    return await timeSlotsRepository.findAll();
  }

  async getTimeSlotById(id) {
    const timeSlot =
      await timeSlotsRepository.findById(id);

    if (!timeSlot) {
      throw new Error("Time slot not found.");
    }

    return timeSlot;
  }

  async updateTimeSlot(id, payload) {
    return await timeSlotsRepository.update(
      id,
      payload
    );
  }

  async deleteTimeSlot(id) {
    return await timeSlotsRepository.delete(id);
  }
}

module.exports = new TimeSlotsService();