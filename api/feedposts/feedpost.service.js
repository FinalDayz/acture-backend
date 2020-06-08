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
    }    
}

