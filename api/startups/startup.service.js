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
            `SELECT DISTINCT startupId, name, TO_BASE64(image) AS image, email, 
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

    getStartupList: (userId, callback) => {
        pool.query(
            `SELECT DISTINCT s.startupId, s.name, s.telephone, 
            s.email, TO_BASE64(s.image) AS image, s.description, s.website, s.ownerId,
            (f.userId is not null) isFollowingThem 
            FROM Startup s
                LEFT JOIN Followed_startups f
                ON f.userId = ?
                AND f.startupId = s.startupId
            ORDER BY s.name ASC`,
            [userId],
            standardResponse.bind(this, callback)
        );
    },
    insertStartup: (data, userId, callback) => {
        pool.query(
            `CALL add_new_startup(?, ?, ?, ?, ?, ?, ?)`,
            [
                data.startupName,
                data.startupDescription,
                data.startupPhone,
                data.startupMail,
                data.startupSite,
                data.startupImage,
                userId
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    leaveStartup: (startupId, userId, callback) => {
        pool.query(
            `DELETE FROM Startup_user WHERE startupId = ? AND userId = ?`,
            [
                startupId,
                userId
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    }
};
