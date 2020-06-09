const { getFeedPosts, getEventsSP, checkAuthorityToDelete, deleteFeedPost, getPersonalBlogs } = require("./feedpost.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");

router.post("/feed", getFeedPosts);//TODO: checkToken toevoegen als het klaar is
router.post("/events", getEventsSP);
router.delete("/", checkAuthorityToDelete, deleteFeedPost);
router.post("/user-blogs", getPersonalBlogs);


module.exports = router;
