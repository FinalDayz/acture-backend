const { createUser, getUserById, getUsers, updateUserDetails, updateUsers, deleteUser, login, getUserDetails, getInOrActiveUsers, activateUser, changeRole, checkLogin, changePassword, resetPassword } = require("./user.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");
const { checkRole } = require("../../auth/role_validation");

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsers);
router.get("/byid/:id", checkToken, checkRole('user'), getUserById);
router.patch("/", checkToken, updateUsers);
router.delete("/:id", checkToken, deleteUser);

router.get("/active/:active", checkToken, checkRole('admin'), getInOrActiveUsers);
router.patch("/activateUser/:id", checkToken, checkRole('admin'), activateUser);

router.post("/changeRole/:id/:newRole", checkToken, checkRole('admin'), changeRole);

router.post("/login", login);

router.post("/register", createUser);
router.patch("/resetPassword", checkToken, checkRole("admin"), resetPassword);

router.post("/changePassword", checkLogin, changePassword);

router.get("/getUserDetails", checkToken, getUserDetails);
router.patch("/updateUserDetails", checkToken, updateUserDetails);

module.exports = router;
