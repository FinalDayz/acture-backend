const {changePrivacySettings, getPrivacySettings} = require("./privacy.controller");

const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");
const { checkRole } = require("../../auth/role_validation");

router.get("/", checkToken, checkRole('member'), getPrivacySettings);
router.post("/", checkToken, checkRole('member'), changePrivacySettings);

module.exports = router;
