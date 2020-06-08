const { getFeedSP, getEventsSP } = require("./feedpost.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");

router.post("/feed", getFeedSP);//TODO: checkToken toevoegen als het klaar is
router.post("/events", getEventsSP);


module.exports = router;
