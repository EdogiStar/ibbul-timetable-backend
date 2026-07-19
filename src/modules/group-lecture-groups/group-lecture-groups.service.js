const groupLectureGroupsRepository = require("./group-lecture-groups.repository");

class GroupLectureGroupsService {
  async createGroup(payload) {
    return await groupLectureGroupsRepository.create(payload);
  }

  async getAllGroups() {
    return await groupLectureGroupsRepository.findAll();
  }

  async getGroupById(id) {
    const group =
      await groupLectureGroupsRepository.findById(id);

    if (!group) {
      throw new Error("Group lecture group not found.");
    }

    return group;
  }

  async updateGroup(id, payload) {
    return await groupLectureGroupsRepository.update(
      id,
      payload
    );
  }

  async deleteGroup(id) {
    return await groupLectureGroupsRepository.delete(id);
  }
}

module.exports = new GroupLectureGroupsService();