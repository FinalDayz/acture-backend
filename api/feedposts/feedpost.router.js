const { getFeedPosts } = require("./feedpost.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");
const { checkRole } = require("../../auth/role_validation");

router.get("/", getFeedPosts); //TODO: checkToken toevoegen als het klaar is

module.exports = router;
