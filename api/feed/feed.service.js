const pool = require("../../config/database");


module.exports = {
    insertPost: (data, userId, callback) => {
        pool.query(
            `insert into Post(text, image, userId, categoryId, title, postDate)
                values(?,FROM_BASE64(?),?, ?, ?, now())`,
            [
                data.text,
                data.image,
                userId,
                data.categoryId,
                data.title,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    insertStartupPost: (data, userId, callback) => {
        pool.query(
            `insert into Post(text, image, userId, categoryId, title, postDate, startup)
                values(?,FROM_BASE64(?),?, ?, ?, now(), ?)`,
            [
                data.text,
                data.image,
                userId,
                data.categoryId,
                data.title,
                data.startupId
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    insertEventPost: (data, userId, callback) => {
        pool.query(
            `CALL add_new_event(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.text,
                data.image,
                userId,
                data.title,

                data.eventName,
                data.eventDate,
                data.eventAddress,
                data.eventCity,
                data.eventPrice
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    updatePost: (data, callback) => {
        pool.query(
            `UPDATE Post
                SET text = ?, image = ?, title = ?
                WHERE postId = ?`,
            [
                data.text,
                data.image,
                data.title,
                data.postId,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    updateEventPost: (data, callback) => {
        pool.query(
            `CALL edit_event(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.text,
                data.image,
                data.title,
                data.postId,

                data.eventName,
                data.eventDate,
                data.eventAddress,
                data.eventCity,
                data.eventPrice
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    getCategories: callback => {
        pool.query(
            `select * from Category`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                // console.log(results[0].categoryId)
                return callback(null, results);
            }
        )
    },


    create: (data, callback) => {
        pool.query(
            `insert into Account(firstname, lastname, register_date, password, role, email)
        values(?, ?, ?, ?, ?, ?)`,
            [
                data.first_name,
                data.last_name,
                data.register_date,
                data.password,
                data.role,
                data.email,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    }
}
