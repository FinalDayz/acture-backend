const { createUser, getUserById, getUsers, updateUsers, deleteUser, login } = require("./user.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");
const { checkRole } = require("../../auth/role_validation");

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, checkRole('user'), getUserById);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

router.post("/login", login);

module.exports = router;
