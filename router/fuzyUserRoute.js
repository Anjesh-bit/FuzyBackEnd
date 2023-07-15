const express = require("express");
const router = express.Router();
const {
  fuzyUserCreate,
  fuzyLogin,
  fuzyUsersFindById,
} = require("../controllers/fuzyUsersController");
const {
  followingUser,
  unFollowingUser,
  followingCount,
  followerCount,
} = require("../controllers/fuzyFollowController");

//registration/login user endPoints:
router.post("/fuzyUserRegistration", fuzyUserCreate);
router.post("/fuzyLogin", fuzyLogin);

//users by id
router.route("/:id").get(fuzyUsersFindById);

//follow/unfollow endpoints:
router.post("/fuzyFollow", followingUser);
router.post("/fuzyUnfollow", unFollowingUser);

//follow/unfollow count route
router.get("/fuzyFollowingCount", followingCount);
router.get("/fuzyFollwerCount", followerCount);

module.exports = router;
