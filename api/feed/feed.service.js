const pool = require("../../config/database");


module.exports = {
    insertPost: (data, callback) => {
        pool.query(
            // `insert into Post(text, image, userId, postDate, categoriId, title)
            //     values(?, ?, ?)`,
            `insert into Post(text, FROM_BASE64(image), userId, categoryId, title)
                values(?, ?, ?, ?, ?)`,
            [
                data.text,
                data.image,
                // data.postDate,
                data.userId,
                data.categoryId,
                data.title,

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
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
