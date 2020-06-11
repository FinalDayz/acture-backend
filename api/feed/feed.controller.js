const {insertPost} = require("./feed.service");
const{getCategories} = require("./feed.service");

const{getUserIdFromToken} = require("../../auth/token_validation");


module.exports = {


    addPost:(req,res) => {
        const userId = getUserIdFromToken(req.get("authorization"))
        console.log("got to backend")
        const body = req.body;
        insertPost(body, userId,(err, results) => {
            if (err) {
                console.log(err);
                return ({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.json({
                success: 1,
                message: "data succesvol toegevoegd"
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
