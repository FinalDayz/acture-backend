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
};

/*
Query om posts op te halen

SELECT DISTINCT * 
FROM Post 
WHERE userId=1 -- userId van Lugus om Lugusnieuws op te halen
OR userId IN (
    SELECT followedUser
    FROM Followed_people
    WHERE userId=2 -- vervang '2'door ID van de ingelogde user
)
OR userId IN (
	SELECT startupId
    FROM Followed_startups
    WHERE userId=2 -- vervang '2' door ID van de ingelogde user
)
OR userId IN (
	SELECT categoryId
    FROM Followed_disciplines
    WHERE userId=2 -- vervang '2' door ID van de ingelogde user
)
ORDER BY postDate
LIMIT 50 OFFSET 0 -- Maximaal aantal posts dat wordt geladen 
*/ 
