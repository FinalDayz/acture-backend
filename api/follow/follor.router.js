const {followOrNot, startupFollowOrNot} = require("./follow.controller");
const { followQuery } = require("./follow.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");
const { checkRole } = require("../../auth/role_validation");

router.get("/:filter/", checkToken, followQuery);
router.patch("/:id/:followOrNot", checkToken, checkRole('member'), followOrNot);
router.patch("/startup/:id/:followOrNot", checkToken, checkRole('member'), startupFollowOrNot);

module.exports = router;
