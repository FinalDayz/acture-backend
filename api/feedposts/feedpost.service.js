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
    getEventsSP: (callback) => {
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

    getOnlyNews: (callback) => {
        pool.query(
            'SELECT DISTINCT *' +
            ' FROM Post' +
            ' WHERE userId=1', //vervang '1' door ID van Lugus
            [],
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
