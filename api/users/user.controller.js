const {uploadUserImage} = require("./user.service");
const {setUserActive} = require("./user.service");
const {create, getUserById, getUsers, saveSettings, getUserDetails, updateUser, deleteUser, getUserByEmail, fetchInOrActiveUsers, updateRole, updatePassword} = require("./user.service");

const {getUserIdFromToken} = require("../../auth/token_validation");
const {genSaltSync, hashSync, compareSync} = require("bcrypt");

const {sign} = require("jsonwebtoken");

module.exports = {
    uploadImage: (req, res) => {
        const image = req.body.imageBase64;
        const id = getUserIdFromToken(req.get("authorization"));

        uploadUserImage(id, image, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1
            });
        });
    },
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
            }
            if (results) {
                return res.json({
                    success: 0,
                    data: "this email is already in use"
                });
            }
        })
    },

    resetPassword: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        console.log(body.newpassword + " " + body.email)
        body.newpassword = hashSync(body.newpassword, salt);
        updatePassword(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                })
            }
            return res.json({
                success: 1,
            });
        });
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
                return res.json({
                    success: 0
                });
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
        const id = req.params.id;
        deleteUser(id, (err, results) => {
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
            let result = false;
            if (body.password.length != 0 && body.email.length != 0) {
                result = compareSync(body.password, results.password);
            } else result = false;
            if (result) {
                results.password = undefined; // Don't send passwords unnecessarily
                let userWithoutImage = {...results};
                userWithoutImage.image = null;
                const jsontoken = sign({result: userWithoutImage}, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login successful",
                    token: jsontoken,
                    user: results,
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },

    changePassword: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.newpassword = hashSync(body.newpassword, salt);
        updatePassword(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update password"
                })
            }
            return res.json({
                success: 1,
                message: "updated password successfully"
            });
        });
    },

    checkLogin: (req, res, next) => {
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
            let result = false;
            if (body.password.length != 0 && body.email.length != 0) {
                result = compareSync(body.password, results.password);
            } else result = false;
            if (result) {
                next();
            } else {
                res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },

    getUserDetails: (req, res) => {
        const id = getUserIdFromToken(req.get("authorization"));
        getUserDetails(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    updateUserDetails: (req, res) => {
        const thisUserId = getUserIdFromToken(req.get("authorization"));

        const body = req.body;
        const id = getUserIdFromToken(req.get("authorization"));
        saveSettings(body, id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user details"
                })
            }
            return res.json({
                success: 1,
                message: "updated user details successfully"
            });
        });
    }
};
