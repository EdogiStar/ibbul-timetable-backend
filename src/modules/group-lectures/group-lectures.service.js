const groupLecturesRepository = require("./group-lectures.repository");

class GroupLecturesService {
  async createGroupLecture(payload) {
    return await groupLecturesRepository.create(payload);
  }

  async getAllGroupLectures() {
    return await groupLecturesRepository.findAll();
  }

  async getGroupLectureById(id) {
    const groupLecture =
      await groupLecturesRepository.findById(id);

    if (!groupLecture) {
      throw new Error("Group lecture not found.");
    }

    return groupLecture;
  }

  async updateGroupLecture(id, payload) {
    return await groupLecturesRepository.update(
      id,
      payload
    );
  }

  async deleteGroupLecture(id) {
    return await groupLecturesRepository.delete(id);
  }
}

module.exports = new GroupLecturesService();