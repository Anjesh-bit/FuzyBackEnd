const express = require("express");
const router = express.Router();
const { fuzyPostController } = require("../controllers/fuzyPostController");
//post user endPoints:
router.post("/fuzyPostByUsers",fuzyPostController);
module.exports = router;
