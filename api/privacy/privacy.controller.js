const {getUserIdFromToken} = require("../../auth/token_validation");
const {fetchSettings, saveSettings} = require("./privacy.service");


const responseFunc = (res, err, results) => {
    if (err) {
        console.log(err);
        return;
    }
    return res.json({
        success: 1,
        data: results
    })
};

module.exports = {
    getPrivacySettings: (req, res) => {
        const thisUserId = getUserIdFromToken(req.get("authorization"));
        fetchSettings(thisUserId, responseFunc.bind(this, res));
    },
    changePrivacySettings: (req, res) => {
        const body = req.body;
        const thisUserId = getUserIdFromToken(req.get("authorization"));
        saveSettings(
            body.firstname, body.lastname, body.address,
            body.preposition, body.email, thisUserId, body.telephone,
            responseFunc.bind(this, res)
        );
    },
};
