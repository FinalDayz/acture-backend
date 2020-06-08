const pool = require("../../config/database");

module.exports = {
    
    //Requires stored procedure: get_feed
    getFeedSP: (id, offs, callback) => {
        pool.query(
            'CALL get_feed(?, ?)',
            [id, offs],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0]);
            } 
        )
    },

    //Requires stored procedure: get_all_categories
    getCategorySP: callback => {
        pool.query(
            'CALL get_all_categories',
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results);
            }
        )
    },

    //Requires stored procedure: get_name_and_image
    getNameImageSP: (id, callback) => {
        pool.query(
            'CALL get_name_and_image(?)',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results);
            }
        )
    },

    //Requires stored procedure: get_events
    getEventsSP: callback => {
        pool.query(
            'CALL get_events',
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0]);
            }            
        )
    },    

    getAttendance: (id, callback) => {
        pool.query(
            'SELECT *' +
            ' FROM Attendants' +
            ' WHERE userId= ?;',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results);
            }
        )
    }
}

