const dashboardService = require("./dashboard.service");

class DashboardController {
  async getDashboardStats(req, res) {
    try {
      const stats = await dashboardService.getDashboardStats();

      return res.status(200).json({
        success: true,
        message: "Dashboard statistics retrieved successfully.",
        data: stats,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve dashboard statistics.",
      });
    }
  }
}

module.exports = new DashboardController();