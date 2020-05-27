const { addPost } = require("./feed.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/addPost", addPost);



module.exports = router;
