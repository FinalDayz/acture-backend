const { getUserMessages } = require("./message.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/:userID", checkToken, getUserMessages);
