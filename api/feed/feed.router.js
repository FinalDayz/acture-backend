const { addPost } = require("./feed.controller");
const{getCategories} = require("./feed.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


router.post("/addPost", checkToken, addPost);

router.get("/getAllCategories", checkToken,getCategories)

module.exports = router;
