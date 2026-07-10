const dashboardRepository = require("./dashboard.repository");

class DashboardService {
  async getDashboardStats() {
    return await dashboardRepository.getDashboardStats();
  }
}

module.exports = new DashboardService();