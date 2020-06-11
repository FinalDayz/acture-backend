const {followOrNot} = require("./follow.controller");
const { followQuery } = require("./follow.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");
const { checkRole } = require("../../auth/role_validation");

router.get("/:filter/", checkToken, checkRole('member'), followQuery);
router.patch("/:id/:followOrNot", checkToken, checkRole('member'), followOrNot);

module.exports = router;
