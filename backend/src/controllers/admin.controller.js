const AdminService = require("../services/admin.service");


exports.createWorker = (req, res) => AdminService.createWorker(req, res);
exports.getWorkers = (req, res) => AdminService.getWorkers(req, res);
exports.updateWorkerStatus = (req, res) => AdminService.updateWorkerStatus(req, res);