const {getUserPosts} = require("./feedpost.controller");
const {checkRole} = require("../../auth/role_validation");
const { getFeedPosts, getGlobalFeedPosts, getEventsSP, getAttendanceSP, getGuidesSP, getBlogsSP, checkAuthorityToDelete, deleteFeedPost, getPersonalBlogs } = require("./feedpost.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");

router.get("/getUserPosts/:id/:offs", checkToken, getUserPosts);
router.post("/feed", getFeedPosts);//TODO: checkToken toevoegen als het klaar is
router.post("/globalFeed", getGlobalFeedPosts);
router.post("/events", getEventsSP);
router.post("/attendance", getAttendanceSP);
router.delete("/", checkAuthorityToDelete, deleteFeedPost);
router.post("/user-blogs", getPersonalBlogs);
router.post("/guides", getGuidesSP);
router.post("/blogs", getBlogsSP);


module.exports = router;
