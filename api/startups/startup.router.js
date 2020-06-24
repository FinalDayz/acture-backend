const {getPosts} = require("./startup.controller");
const {getStartup} = require("./startup.controller");
const {followOrNot} = require("./startup.controller");
const { followQuery, workingForQuery } = require("./startup.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");

router.get("/byuserid/:userid", checkToken, followQuery);
router.get("/bystartupid/:startupid", checkToken, workingForQuery);
router.get("/getstartup/:startupid", checkToken, getStartup);
router.get("/getposts/:startupid", checkToken, getPosts);
router.patch("/:id/:followOrNot", checkToken, followOrNot);

module.exports = router;
"/active/:active"
