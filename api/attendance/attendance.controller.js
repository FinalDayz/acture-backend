const {insertTotalPeople} = require("./attendance.service");

const { getUserIdFromToken } = require("../../auth/token_validation");
const { insertAttendance } = require("./attendance.service");
const { fetchAll } = require("./attendance.service");

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
        insertTotalPeople(eventId,(err,results)=>{
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: "Database connection error"
                });
            }
      return
        });
    },


    getAttendance: (req, res) => {
        const eventId = req.params.eventId;
        fetchAll(eventId, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: null
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        })
    }

}

