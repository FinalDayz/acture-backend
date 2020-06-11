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
    getEventsSP: (userId, callback) => {
        pool.query(
            'CALL get_events(?)',
            [userId],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0]);
            }            
        )
    },
    
    getAttendanceSP: (id, callback) => {
        pool.query(
            'CALL get_attendance(?)',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0]);
            }            
        )
    },

    //Requires stored procedure: get_only_lugus
    getOnlyNews: (offs, callback) => {
        pool.query(
            'CALL get_only_lugus(?)',
            [offs],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    verifyPoster: (userId, postId, callback) => {
        pool.query(
            'SELECT EXISTS(SELECT * FROM `Post` WHERE `postId` = ? AND `userId` = ?) AS `results`;',
            [postId, userId],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    deleteFeedPost: (postId, callback) => {
        pool.query(
            'DELETE FROM `Post` WHERE `Post`.`postId` = ?',
            [postId],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, true);
            }
        )
    },

    getPersonalBlogs: (userId, callback) => {
        pool.query(
            'SELECT * FROM `Post` WHERE `userId` = ? AND `categoryId` = 7',
            [userId],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        )
    }
}    
