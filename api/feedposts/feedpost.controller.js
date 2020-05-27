const { getFeedPosts, getOnlyNews } = require("./feedpost.service");
const { getRoleFromToken } = require("../../auth/token_validation");

module.exports = {
    getFeedPosts: (req, res) => {
        const id = req.params.id;
        userRole = getRoleFromToken(req.get("authorization"));
        if (userRole == 'member' || userRole == 'admin') {
            getFeedPosts(id, (err, results) => {
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
            getOnlyNews( (err, results) => {
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
    }
}
