const pool = require("../../config/database");

const standardResponse = (callback, error, results, fields) => {
    if (error) {
        return callback(error);
    }
    return callback(null, results);
};

module.exports = {
    fetchAll: (userId, filter, callback) => {
        pool.query(
            `SELECT DISTINCT startupId, name, image, email, 
                    IF(startupId IN (
                        SELECT startupId 
                        FROM Followed_startups 
                        WHERE userId = ?)
                        , 'true', 'false') 
                    AS isFollowingThem
                FROM Startup
                WHERE startupId IN (
                    SELECT startupId
                    FROM Startup_user
                    WHERE userId = ?)`,
            [userId, filter],
            standardResponse.bind(this, callback)
        );
    },
    workingForfetchAll: (userId, filter, callback) => {
        pool.query(
            `SELECT DISTINCT userId, firstname, tussenvoegsel, lastname, TO_BASE64(image) image, 
                        IF(userId IN ( 
                            SELECT userId FROM Followed_people WHERE userId = ?)
                            , 'true', 'false') 
                        AS isFollowing 
                    FROM Account 
                    WHERE userId IN ( 
                        SELECT userId 
                        FROM Startup_user 
                        WHERE startupId = ?)`,
            [userId, filter],
            standardResponse.bind(this, callback)
        );
    },

    getStartupById: (startupId, callback) => {
        pool.query(
            `SELECT startupId, name, telephone, email, TO_BASE64(image) as image, description, website, ownerId
                FROM Startup
                WHERE startupId = ?`,
            [startupId],
            standardResponse.bind(this, callback)
        );
    },

    deleteFollow: (thisUserId, theirStartupId, callback) => {
        console.log("delete: " + thisUserId, theirStartupId)
        pool.query(
            `DELETE FROM Followed_startups
                WHERE userId = ? AND startupId = ?`,
            [thisUserId, theirStartupId],
            standardResponse.bind(this, callback)
        );
    },

    addFollow: (thisUserId, theirStartupId, callback) => {
        pool.query(
            `INSERT INTO Followed_startups
                    (userId, startupId) VALUES 
                    (?, ?)`,
            [thisUserId, theirStartupId],
            standardResponse.bind(this, callback)
        );
    },

    getStartupPosts: (startupId, callback) => {
        pool.query(
            `SELECT p.postId, p.text, TO_BASE64(p.image) as image, p.userId, p.categoryId, p.title, p.startup,
            a.firstname, a.lastname, a.tussenvoegsel, TO_BASE64(a.image) AS profileImage, c.name AS categoryname
                FROM Post p
                LEFT JOIN Account a
                    ON p.userId = a.userId
                LEFT JOIN Category c
                    ON p.categoryId = c.categoryId
                WHERE p.startup = ?`,
            [startupId],
            standardResponse.bind(this, callback)
        );
    },
};
