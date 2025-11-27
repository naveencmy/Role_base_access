const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid");


const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, path.join(__dirname, "../uploads"));
},
filename: (req, file, cb) => {
const ext = path.extname(file.originalname);
cb(null, uuid() + ext);
},
});


module.exports = multer({ storage });