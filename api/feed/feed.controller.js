const {insertPost} = require("./feed.service");
const{getCategories} = require("./feed.service");

module.exports = {
    addPost:(req,res) => {
        console.log("got to backend")
        const body = req.body;
        insertPost(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
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
