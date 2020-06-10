const { insertAttendance } = require("./attendance.service");
const router = require("express").Router();

router.post("/addAttendant", insertAttendance);

module.exports = router;