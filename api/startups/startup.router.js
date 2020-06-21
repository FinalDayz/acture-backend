const {followOrNot} = require("./startup.controller");
const { followQuery, workingForQuery } = require("./startup.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");

router.get("/byuserid/:userid", checkToken, followQuery);
router.get("/bystartupid/:startupid", checkToken, workingForQuery);
router.patch("/:id/:followOrNot", checkToken, followOrNot);

module.exports = router;
"/active/:active"
