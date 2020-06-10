const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into Account(firstname, tussenvoegsel, lastname, register_date, password, role, email)
                values(?, ?, ?, ?, ?, ?, ?)`,
            [
                data.firstname,
                data.tussenvoegsel,
                data.lastname,
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

    fetchInOrActiveUsers: (active, callback) => {
        pool.query(
            `SELECT
            userId, firstname, tussenvoegsel, register_date, lastname,
            TO_BASE64(image) image, register_date, role, email, activated
            FROM Account ` + (active ?
                `WHERE activated = 1` :
                `WHERE activated <> 1 OR activated IS NULL`),
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
            `select userId, firstname, lastname, password, role, email, TO_BASE64(image) from Account`,
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

    updateRole: (id, newRole, callback) => {
        pool.query(
            `update Account set role=? where userId = ?`,
            [newRole, id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
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

    deleteUser: (id, callback) => {
        pool.query(
            `UPDATE Account SET 
                address='',unregister_date=NOW(),email='',image=null,
                telephone=null,description=null,activated=0, password=null
                WHERE userId = ?`,
            [id],
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
            `select firstname, lastname, userId, address, tussenvoegsel, register_date, 
            unregister_date, password, role, email, telephone, description, activated 
            from Account where email = ?`,
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


