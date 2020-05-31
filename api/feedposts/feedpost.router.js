const { getFeedPosts, getEvents, getAttendance } = require("./feedpost.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");
const { checkRole } = require("../../auth/role_validation");

router.get("/", getFeedPosts); //TODO: checkToken toevoegen als het klaar is
router.get("/", getEvents); //TODO: checkToken toevoegen als het klaar is
router.get("/", getAttendance); //TODO: checkToken toevoegen als het klaar is

module.exports = router;
