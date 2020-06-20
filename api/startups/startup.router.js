const {followOrNot} = require("./startup.controller");
const { followQuery } = require("./startup.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");

router.get("/:userid/", checkToken, followQuery);
router.patch("/:id/:followOrNot", checkToken, checkRole('member'), followOrNot);

module.exports = router;
