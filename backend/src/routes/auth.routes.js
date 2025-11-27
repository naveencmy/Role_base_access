const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");


router.post("/register-admin", AuthController.registerAdmin);
router.post("/login", AuthController.login);


module.exports = router;