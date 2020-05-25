const { addPost } = require("./feed.controller");
const router = require("express").Router();

router.post("/add/post", addPost);

module.exports = router;
