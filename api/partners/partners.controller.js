const {getAllPartners} = require("./partners.service");

module.exports = {
    getAllPartners: (req, res) => {
        getAllPartners((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: null
                });
            }
            console.log(results)
            return res.json({
                success: 1,
                data: results
            });
        })
    }

}

