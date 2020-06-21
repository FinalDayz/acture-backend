const { insertAttendance } = require("./attendance.controller");
const router = require("express").Router();
const { getAttendance } = require("./attendance.controller");

router.post("/addAttendant", insertAttendance);
router.get('/getAttendance/:eventId', getAttendance); //:eventId

module.exports = router;
