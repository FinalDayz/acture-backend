const pool = require("../../config/database");

module.exports = {
    getFeedPosts: (id, callback) => {
        pool.query(
            'SELECT DISTINCT *' + 
            ' FROM Post' + 
            ' WHERE userId=1' + //vervang '1' door ID van Lugus
            ' OR userId IN (' +
                ' SELECT followedUser' +
                ' FROM Followed_people' +
                ' WHERE userId= ?' + 
            ')' +
            ' OR userId IN (' +
                ' SELECT startupId' +
                ' FROM Followed_startups' +
                ' WHERE userId= ?' + 
            ')' +
            ' OR userId IN (' +
                ' SELECT categoryId' +
                ' FROM Followed_disciplines' +
                ' WHERE userId= ?' + 
            ')' +
            ' ORDER BY postDate' +
            ' LIMIT 50 OFFSET 0', //'0' moet variabele worden
            [id, id, id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results);
            }
        )
    },

    getEvents: callback => {
        pool.query(
            'SELECT *' +
            ' FROM Post;' +
            ' ORDER BY postDate' +
            ' LIMIT 50 OFFSET 0',
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results);
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


    // getNewsPosts: callback => {
    //     pool.query(
    //         'select * from posts where userId=1 order by postDate desc',
    //         [],
    //         (error, results, fields) => {
    //             if (error) {
    //                 return callback(error)
    //             }
    //             return callback(null, results);
    //         }
    //     )
    // }
}

