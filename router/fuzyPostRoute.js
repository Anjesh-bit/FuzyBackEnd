const express = require("express");
const router = express.Router();
const {
  fuzyPostCreate,
  fuzyPostFindPopulate,
  fuzyPostFindByIdPopulate,
  fuzyPostOfOneUser,
} = require("../controllers/fuzyPostController");
const { multerMultiUpload } = require("../middlewares/upload");

//post user endPoints:
router.post("/fuzyPostByUsers", multerMultiUpload, fuzyPostCreate);

//posts users by id:
router.route("/:id").get(fuzyPostFindByIdPopulate);

router.get("/fuzyGetAllPosts", fuzyPostFindPopulate);
router.get("/fuzyGetPostoFoneUser/:id", fuzyPostOfOneUser);

module.exports = router;
