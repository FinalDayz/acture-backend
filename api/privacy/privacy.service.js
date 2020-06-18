const pool = require("../../config/database");
const fetchSettings = require("./privacy.service");

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
    },
    saveSettings: (firstname, lastname, address, preposition, email, userId, telephone, callback) => {
        pool.query(
            `INSERT INTO Privacy
                (firstname, lastname, address, tussenvoegsel, email, userId, telephone)
            VALUES
                 (?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
                 firstname=?,
                 lastname=?,
                 address=?,
                 tussenvoegsel=?,
                 email=?,
                 telephone=?`,
            [
                firstname, lastname, address, preposition, email, userId, telephone,
                firstname, lastname, address, preposition, email, telephone
            ],
            standardResponse.bind(this, callback)
        );
    },

    removePrivacyFields: (data) => {

        if(data !== undefined) {
            for(const row of data) {
                if(row.privacyAddress===0 && row.address) {
                    row.address = '[verborgen]';
                }
                if(row.privacyEmail===0 && row.email) {
                    row.email = '[verborgen]';
                }
                if(row.privacyTelephone===0 && row.telephone) {
                    row.address = '[verborgen]';
                }
            }
        }

        return data;
    }
};
