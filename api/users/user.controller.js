const {setUserActive} = require("./user.service");
const { create, getUserById, getUsers, updateUser, deleteUser, getUserByEmail, fetchInOrActiveUsers, updateRole } = require("./user.service");

const { genSaltSync, hashSync, compareSync} = require("bcrypt");

const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;

        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
                create(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: 0,
                            message: "Database connection error"
                        });
                    }
                    return res.json({
                        success: 1,
                        data: results
                    })
                });
            } if (results){
                return res.json({
                    success: 0,
                    data: "this email is already in use"
                });
            }
        })
    },

    changeRole: (req, res) => {
        const id = req.params.id;
        const newRole = req.params.newRole;
        updateRole(id, newRole, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1
            });
        });
    },

    activateUser: (req, res) => {
        const id = req.params.id;
        setUserActive(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1
            });
        });
    },

    getInOrActiveUsers: (req, res) => {
        const active = req.params.active === 'true';
        fetchInOrActiveUsers(active, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);

                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                })
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    Message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                Message: "user deleted successfully"
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined; // Don't send passwords unnecessarily
                const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login successful",
                    token: jsontoken
                });
            }
            else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    }
};
