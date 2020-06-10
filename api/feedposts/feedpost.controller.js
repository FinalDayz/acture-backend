const { getFeedSP, getEventsSP, getOnlyNews, verifyPoster, deleteFeedPost, getPersonalBlogs } = require("./feedpost.service");
const { getRoleFromToken, getUserIdFromToken } = require("../../auth/token_validation");

module.exports = {
    getFeedPosts: (req, res) => {
        const id = getUserIdFromToken(req.get("authorization"));
        const offs = req.body.offs;
        userRole = getRoleFromToken(req.get("authorization"));
        if (userRole == 'member' || userRole == 'admin') {
            getFeedSP(id, offs, (err, results) => {
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
        }
        else {
            getOnlyNews(offs, (err, results) => {
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
        }
    },

    checkAuthorityToDelete: (req, res, next) => {

        // check if the requester is an admin
        if (getRoleFromToken(req.get("authorization")) === 'admin') {
            next();
            return;
        }

        // otherwise, check if the requester is an authorized user

        let token = req.get("authorization");

        verifyPoster(getUserIdFromToken(token), req.body.postId, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            if (results) {
                if (results.results === 0) {
                    res.json({
                        success: 0,
                        message: "Access denied: unauthorized user"
                    });
                }
                if (results.results === 1) {
                    next();
                }
            }
            else {
                res.json({
                    success: 0,
                    message: "Oops! Something went wrong..."
                })
            }
        });

    },

    deleteFeedPost: (req, res) => {
        deleteFeedPost(req.body.postId, (err, results) => {
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
                message: "post deleted successfully"
            });
        });
    },

    getEventsSP: (req, res) => {
        const id = getUserIdFromToken(req.get("authorization"));
        getEventsSP(id, (err, results) => {
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

    getAttendanceSP: (req, res) => {
        getAttendanceSP((err, results) => {
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
    
    getPersonalBlogs: (req, res) => {
        getPersonalBlogs(req.body.userId, (err, results) => {
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
    }
};
