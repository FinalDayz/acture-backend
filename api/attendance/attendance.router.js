const { insertAttendance } = require("./attendance.controller");
const router = require("express").Router();

router.post("/addAttendant", insertAttendance);

module.exports = router;