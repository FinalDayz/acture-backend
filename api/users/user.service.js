const pool = require("../../config/database");
const {removePrivacyFields} = require("../privacy/privacy.service");


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
        })
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
            `select userId, firstname, lastname, 
            password, role, email, TO_BASE64(image),
            pr.address as privacyAddress, pr.email as privacyEmail, pr.telephone as privacyTelephone
            from Account
            LEFT JOIN Privacy pr ON pr.userId = a.userId`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                results = removePrivacyFields(results);
                return callback(null, results);
            }
        )
    },

    getUserById: (id, callback) => {
        pool.query(
            `select a.userId, a.firstname, a.lastname, a.role, a.tussenvoegsel, a.email, TO_BASE64(a.image) image, a.telephone, a.description,
             pr.address as privacyAddress, pr.email as privacyEmail, pr.telephone as privacyTelephone
            from Account a
            LEFT JOIN Privacy pr ON pr.userId = a.userId
            where a.userId = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                results = removePrivacyFields(results);
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

    updatePassword: (data, callback) => {
        pool.query(
            `update Account set password = ? where email = ? `,
            [
                data.newpassword,
                data.email
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
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
            unregister_date, password, role, email, telephone, description, activated, TO_BASE64(image) 
            as image from Account where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

    getUserDetails: (id, callback) => {
        pool.query(
            `select firstname, lastname, tussenvoegsel, address, telephone, description from Account where userId = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    saveSettings: (data, id, callback) => {
        pool.query(
            'update Account set firstname=?, tussenvoegsel=?, lastname=?, address=?, telephone=?, description=? where userId = ?',
            [
                data.firstname,
                data.tussenvoegsel,
                data.lastname,
                data.address,
                data.telephone,
                data.description,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
};


