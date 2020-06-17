const pool = require("../../config/database");

const standardResponse = (callback, error, results, fields) => {
    if (error) {
        return callback(error);
    }
    return callback(null, results);
};

module.exports = {

    fetchSettings: (userId, callback) => {
        pool.query(
            `SELECT firstname, lastname, address, tussenvoegsel, email, telephone 
            FROM Privacy WHERE userId = ?`,
            [userId],
            standardResponse.bind(this, callback)
        );
    }
};
