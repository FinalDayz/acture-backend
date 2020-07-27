const pool = require("../../config/database");

module.exports = {

    getAllPartners: callback => {
        pool.query(
            'SELECT TO_BASE64(image) as image FROM Partners',
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    }
}