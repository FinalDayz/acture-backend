const pool = require("../../config/database");

module.exports = {
    getFeedPosts: callback => {
        pool.query(
            'select * from posts', //vervang door onderstaande query
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results);
            }
        )
    },

    getNewsPosts: callback => {
        pool.query(
            'select * from posts where userId=1 order by postDate desc',
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results);
            }
        )
    }
}

/*
Query om posts op te halen

SELECT * 
FROM `Post` 
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