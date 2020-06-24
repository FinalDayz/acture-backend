const { followOrNot, followQuery, workingForQuery, getStartupList, addStartup, leaveStartup } = require("./startup.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { checkRole } = require("../../auth/role_validation");

router.get("/byuserid/:userid", checkToken, followQuery);
router.get("/bystartupid/:startupid", checkToken, workingForQuery);
router.patch("/:id/:followOrNot", checkToken, followOrNot);
router.get("/startuplist", checkToken, checkRole("member"), getStartupList)
router.patch("/new", checkToken, checkRole('member'), addStartup);
router.patch("/leave", checkToken, leaveStartup);


module.exports = router;
