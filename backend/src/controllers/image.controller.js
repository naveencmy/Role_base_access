const ImageService = require("../services/image.service");


exports.upload = (req, res) => ImageService.upload(req, res);
exports.list = (req, res) => ImageService.list(req, res);
exports.getById = (req, res) => ImageService.getById(req, res);