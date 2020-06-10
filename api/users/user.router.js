const { createUser, getUserById, getUsers, updateUsers, deleteUser, login, register, getInOrActiveUsers, activateUser, changeRole } = require("./user.controller");
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

module.exports = router;
