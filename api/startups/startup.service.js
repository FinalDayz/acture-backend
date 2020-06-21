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
        console.log("added: " + thisUserId, theirStartupId)
        pool.query(
            `INSERT INTO Followed_startups
                    (userId, startupId) VALUES 
                    (?, ?)`,
            [thisUserId, theirStartupId],
            standardResponse.bind(this, callback)
        );
    },
};
