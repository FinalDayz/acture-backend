const {getStartupPosts} = require("./startup.service");
const {getStartupById} = require("./startup.service");
const {addFollow, deleteFollow, fetchAll, workingForfetchAll, getStartupList, insertStartup, leaveStartup} = require("./startup.service");
const {getUserIdFromToken} = require("../../auth/token_validation");

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

    getStartup: (req, res) => {
        const startupId = req.params.startupid;
        getStartupById(startupId, responseFunc.bind(this, res));
    },

    getPosts: (req, res) => {
        const startupId = req.params.startupid;
        getStartupPosts(startupId, responseFunc.bind(this, res));
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

    addStartup: (req, res) => {
        const userId = getUserIdFromToken(req.get("authorization"));
        const data = req.body.data;


        insertStartup(data, userId,(err, results) => {
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
    },

    getStartupList: (req, res) => {
        const thisUserId = getUserIdFromToken(req.get("authorization"));
        getStartupList(thisUserId, responseFunc.bind(this, res));

    },

    leaveStartup: (req, res) => {
        const userId = getUserIdFromToken(req.get("authorization"));
        const starupId = req.body.startupId;

        leaveStartup(starupId, userId,(err, results) => {
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
};
