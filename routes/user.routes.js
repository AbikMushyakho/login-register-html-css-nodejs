const Router = require("router");
const UserController = require("../controller/user.controller");
const router = Router();

router.post("/register", UserController.register);
router.post("/login",UserController.login);
router.post("/forget_password",UserController.forget_pw);
router.post("/verify_code",UserController.verify_code);
router.post("/change_password",UserController.change_password);


module.exports = router;