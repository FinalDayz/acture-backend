const {getUserPosts} = require("./feedpost.controller");
const {checkRole} = require("../../auth/role_validation");
const { getFeedPosts, getGlobalFeedPosts, getEventsSP, getAttendanceSP, getGuidesSP, getBlogsSP, checkAuthorityToDelete, deleteFeedPost, getPersonalBlogs } = require("./feedpost.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");

router.get("/getUserPosts/:id/:offs", checkToken, checkRole('member'), getUserPosts);
router.post("/feed", checkToken, getFeedPosts);
router.post("/globalFeed", checkToken, getGlobalFeedPosts);
router.post("/events", checkToken, getEventsSP);
router.post("/attendance", checkToken, getAttendanceSP);
router.delete("/", checkToken, checkAuthorityToDelete, deleteFeedPost);
router.post("/user-blogs", checkToken, getPersonalBlogs);
router.post("/guides", checkToken, getGuidesSP);
router.post("/blogs", checkToken, getBlogsSP);


module.exports = router;
