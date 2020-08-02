const { getAllPartners } = require("./partners.controller");
const router = require("express").Router();

router.get("/allPartners", getAllPartners);

module.exports = router;