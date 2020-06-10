const { insertAttendance } = require("./attendance.service");
const { getUserIdFromToken } = require("../../auth/token_validation");

module.exports = {
    insertAttendance: (req, res) => {
        const eventId = req.body.eventId;
        const userId = getUserIdFromToken(req.get("authorization"));
        insertAttendance(eventId, userId, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "Insert succesful"
            });
        });
    }
}