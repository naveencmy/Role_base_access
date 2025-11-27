const AuthService = require("../services/auth.service");


exports.registerAdmin = (req, res) => AuthService.registerAdmin(req, res);
exports.login = (req, res) => AuthService.login(req, res);