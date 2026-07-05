const authService = require("./auth.service");

class AuthController {
  async login(req, res) {
    try {
      const { identifier, password } = req.body;

      if (!identifier || !password) {
        return res.status(400).json({
          success: false,
          message: "Identifier and password are required.",
        });
      }

      const result = await authService.login(identifier, password);

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();