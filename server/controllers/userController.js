const ApiError = require("../error/ApiError");

class UserController {
  async registration(req, res) {}
  async login(req, res) {}
  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      next(ApiError.badRequest("Could not find ID"));
    }
  }
}

module.exports = new UserController();
