const programmesRepository = require("./programmes.repository");

class ProgrammesService {
  async createProgramme(payload) {
    return await programmesRepository.create(payload);
  }

  async getAllProgrammes() {
    return await programmesRepository.findAll();
  }

  async getProgrammeById(id) {
    const programme = await programmesRepository.findById(id);

    if (!programme) {
      throw new Error("Programme not found.");
    }

    return programme;
  }

  async updateProgramme(id, payload) {
    return await programmesRepository.update(id, payload);
  }

  async deleteProgramme(id) {
    return await programmesRepository.delete(id);
  }
}

module.exports = new ProgrammesService();