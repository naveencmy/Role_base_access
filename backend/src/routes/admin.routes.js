const router = require("express").Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const AdminController = require("../controllers/admin.controller");


router.post("/create-worker", auth, roleCheck("admin"), AdminController.createWorker);
router.get("/workers", auth, roleCheck("admin"), AdminController.getWorkers);
router.patch("/worker/:id/status", auth, roleCheck("admin"), AdminController.updateWorkerStatus);


module.exports = router;