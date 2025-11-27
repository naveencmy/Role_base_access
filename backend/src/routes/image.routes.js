const router = require("express").Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const upload = require("../config/multer");
const ImageController = require("../controllers/image.controller");


router.post("/upload", auth, roleCheck("admin"), upload.single("image"), ImageController.upload);
router.get("/list", auth, ImageController.list);
router.get("/:id", auth, ImageController.getById);


module.exports = router;