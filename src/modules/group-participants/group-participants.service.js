const groupParticipantsRepository = require("./group-participants.repository");

class GroupParticipantsService {
  async createParticipant(payload) {
    return await groupParticipantsRepository.create(payload);
  }

  async getAllParticipants() {
    return await groupParticipantsRepository.findAll();
  }

  async getParticipantById(id) {
    const participant =
      await groupParticipantsRepository.findById(id);

    if (!participant) {
      throw new Error("Group participant not found.");
    }

    return participant;
  }

  async updateParticipant(id, payload) {
    return await groupParticipantsRepository.update(
      id,
      payload
    );
  }

  async deleteParticipant(id) {
    return await groupParticipantsRepository.delete(id);
  }
}

module.exports = new GroupParticipantsService();