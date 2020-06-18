const pool = require("../../config/database");

module.exports = {

    insertAttendance: (eventId, userId, callback) => {
        pool.query(
            'INSERT INTO Attendants VALUE (? , ?)',
            [eventId, userId],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, true);
            }
        )
    },

    fetchAll: (eventId, callback) => {
        pool.query(
            // `SELECT * from Attendants WHERE eventId = ?`,  // ADD THE FOLLOWING:
            `SELECT att.eventId, acc.userId,
            acc.firstname, acc.tussenvoegsel, 
            acc.register_date, acc.lastname,
            TO_BASE64(acc.image) image,
            acc.register_date, acc.role, acc.email, acc.activated
            FROM Account acc JOIN Attendants att on acc.userId = att.userId 
            WHERE att.eventId = ?`,
            [eventId],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}
