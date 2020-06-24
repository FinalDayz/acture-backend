const {followOrNot} = require("./startup.controller");
const { followQuery, workingForQuery, getStartupList } = require("./startup.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");
const { checkRole } = require("../../auth/role_validation");


router.get("/byuserid/:userid", checkToken, followQuery);
router.get("/bystartupid/:startupid", checkToken, workingForQuery);
router.patch("/:id/:followOrNot", checkToken, followOrNot);
router.get("/startuplist", checkToken, checkRole("member"), getStartupList)

module.exports = router;
"/active/:active"
