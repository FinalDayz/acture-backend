const pool = require("../../config/database");

module.exports = {
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
    },

    setUserActive: (id, callback) => {
        console.log(`UPDATE Account
        SET activated = 1 
        WHERE userId = ?`,
            [id]);
        pool.query(`UPDATE Account
        SET activated = 1 
        WHERE userId = ?`,
            [id],
            (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

    fetchInactiveUsers: callback => {
        pool.query(
            `SELECT
            userId, firstname, tussenvoegsel, register_date, lastname,
            image, register_date, role, email, activated
            FROM Account
            WHERE activated <> 1 OR activated IS NULL`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getUsers: callback => {
        pool.query(
            `select userId, firstname, lastname, password, role, email from Account`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getUserById: (id, callback) => {
        pool.query(
            `select userId, firstname, lastname, password, role, email from Account where userId = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    updateUser: (data, callback) => {
        pool.query(
            `update Account set firstname=?, lastname=?, register_date=?, password=?, role=?, email=? where userId = ?`,
            [
                data.first_name,
                data.last_name,
                data.register_date,
                data.password,
                data.role,
                data.email,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

    deleteUser: (data, callback) => {
        pool.query(
            `delete from Account where userId = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

    getUserByEmail: (email, callback) => {
        pool.query(
            `select * from Account where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }
};


