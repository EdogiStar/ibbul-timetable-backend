const levelsRepository = require("./levels.repository");

class LevelsService {
  async createLevel(payload) {
    return await levelsRepository.create(payload);
  }

  async getAllLevels() {
    return await levelsRepository.findAll();
  }

  async getLevelById(id) {
    const level = await levelsRepository.findById(id);

    if (!level) {
      throw new Error("Level not found.");
    }

    return level;
  }

  async updateLevel(id, payload) {
    return await levelsRepository.update(id, payload);
  }

  async deleteLevel(id) {
    return await levelsRepository.delete(id);
  }
}

module.exports = new LevelsService();