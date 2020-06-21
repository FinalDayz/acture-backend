const {addFollow} = require("./startup.service");
const {deleteFollow} = require("./startup.service");
const {getUserIdFromToken} = require("../../auth/token_validation");
const {fetchAll, workingForfetchAll} = require("./startup.service");

const {} = require("./startup.service");

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
    followQuery: (req, res) => {
        const filter = req.params.userid;
        const thisUserId = getUserIdFromToken(req.get("authorization"));
        fetchAll(thisUserId, filter, responseFunc.bind(this, res));
    },

    workingForQuery: (req, res) => {
        const filter = req.params.startupid;
        const thisUserId = getUserIdFromToken(req.get("authorization"));
        workingForfetchAll(thisUserId, filter, responseFunc.bind(this, res));
    },

    followOrNot: (req, res) => {
        const thisUserId = getUserIdFromToken(req.get("authorization"));
        const follow = req.params.followOrNot;
        const theirStartupId = req.params.id;

        if(follow == 1) {
            addFollow(thisUserId, theirStartupId, responseFunc.bind(this, res));
        } else if(follow == 0) {
            deleteFollow(thisUserId, theirStartupId, responseFunc.bind(this, res));
        }

    },
};
