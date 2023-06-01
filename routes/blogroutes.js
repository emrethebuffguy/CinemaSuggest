const express = require("express")
const fs = require('fs');
const {getBlog,getBlogFrontEnd,updateBlog,deleteBlog,addBlog} = require("../controllers/getBlog");
const {protect} = require("../controllers/authController");

const router = express.Router();

router.route("/").get(protect, getBlog).post(addBlog);
router.route("/:id").patch(protect,updateBlog).delete(protect,deleteBlog);
router.route("/published").get(getBlogFrontEnd);

module.exports = router;