const {addFollow, startupAddFollow} = require("./follow.service");
const {deleteFollow, startupDeleteFollow} = require("./follow.service");
const {getUserIdFromToken} = require("../../auth/token_validation");
const {fetchAll} = require("./follow.service");

const {} = require("./follow.service");

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
        const filter = req.params.filter;
        const thisUserId = getUserIdFromToken(req.get("authorization"));
        const includeNotfollowed = filter === 'all';
        fetchAll(thisUserId, includeNotfollowed, responseFunc.bind(this, res));

    },

    followOrNot: (req, res) => {
        const thisUserId = getUserIdFromToken(req.get("authorization"));
        const follow = req.params.followOrNot;
        const theirUserId = req.params.id;

        if(follow == 1) {
            addFollow(thisUserId, theirUserId, responseFunc.bind(this, res));
        } else if(follow == 0) {
            deleteFollow(thisUserId, theirUserId, responseFunc.bind(this, res));
        }

    },

    startupFollowOrNot: (req, res) => {
        const thisUserId = getUserIdFromToken(req.get("authorization"));
        const follow = req.params.followOrNot;
        const startupId = req.params.id;

        if(follow == 1) {
            startupAddFollow(thisUserId, startupId, responseFunc.bind(this, res));
        } else if(follow == 0) {
            startupDeleteFollow(thisUserId, startupId, responseFunc.bind(this, res));
        }

    },
};
