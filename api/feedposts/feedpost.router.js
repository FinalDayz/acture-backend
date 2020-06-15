const { getFeedPosts, getEventsSP, getAttendanceSP, getGuidesSP, checkAuthorityToDelete, deleteFeedPost, getPersonalBlogs } = require("./feedpost.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");

router.post("/feed", getFeedPosts);//TODO: checkToken toevoegen als het klaar is
router.post("/events", getEventsSP);
router.post("/attendance", getAttendanceSP)
router.delete("/", checkAuthorityToDelete, deleteFeedPost);
router.post("/user-blogs", getPersonalBlogs);
router.post("/guides", getGuidesSP);


module.exports = router;
