const { addPost, editPost } = require("./feed.controller");
const{getCategories} = require("./feed.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { checkRole } = require("../../auth/role_validation");


router.post("/addPost", checkToken, checkRole("member"), addPost);
router.patch("/editPost", checkToken, checkRole("member"), editPost);
router.get("/getAllCategories",checkToken,getCategories);

module.exports = router;

