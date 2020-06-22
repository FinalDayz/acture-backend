const { insertPost, insertStartupPost, insertEventPost, updatePost, updateStartupPost, updateEventPost, getCategories } = require("./feed.service");

const{getUserIdFromToken} = require("../../auth/token_validation");


module.exports = {


    addPost: (req, res) => {
        const userId = getUserIdFromToken(req.get("authorization"));
        const data = req.body.data;

        //if post is startup news
        if (data.categoryId === 1) {
            insertStartupPost(data, userId, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                return res.json({
                    success: 1,
                    message: "inserted into database"
                });
            })
        }

        //if post is an event
        else if (data.categoryId === 4) {
            insertEventPost(data, userId, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                return res.json({
                    success: 1,
                    message: "inserted into database"
                });
            })
        }

        //if post is of another category
        else {
            insertPost(data, userId,(err, results) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                return res.json({
                    success: 1,
                    message: "inserted into database"
                });
            });
        }
    },

    editPost: (req, res) => {
        const data = req.body.data;

        //if post is an event
        if (data.categoryId === 4) {
            updateEventPost(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                return res.json({
                    success: 1,
                    message: "inserted into database"
                });
            })
        }

        //if post is of another category
        else {
            updatePost(data,(err, results) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                return res.json({
                    success: 1,
                    message: "inserted into database"
                });
            });
        }
    },

    getCategories: (req, res) => {
        getCategories((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }

}
