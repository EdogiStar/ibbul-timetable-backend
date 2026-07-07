const venuesRepository = require("./venues.repository");

class VenuesService {
  async createVenue(payload) {
    return await venuesRepository.create(payload);
  }

  async getAllVenues() {
    return await venuesRepository.findAll();
  }

  async getVenueById(id) {
    const venue = await venuesRepository.findById(id);

    if (!venue) {
      throw new Error("Venue not found.");
    }

    return venue;
  }

  async updateVenue(id, payload) {
    return await venuesRepository.update(id, payload);
  }

  async deleteVenue(id) {
    return await venuesRepository.delete(id);
  }
}

module.exports = new VenuesService();