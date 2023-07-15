const fuzyUserModal = require("../models/fuzyUsersModel");
const fuzyFollowModel = require("../models/fuzyFollowModel");
const asyncHandler = require("express-async-handler");

//if user is following
const followingUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const targetUserId = id;
    const currentUserId = req.user.id;

    const targetUser = await fuzyUserModal.findById(targetUserId);
    const currentUser = await fuzyUserModal.findById(currentUserId);

    //check if the user  exists
    if (!targetUser || !currentUser) {
      res.status(400).json({
        message: "The users are invalid",
      });
    }

    const existingFollow = await fuzyFollowModel.findById({
      currentUserId,
      targetUserId,
    });

    if (existingFollow) {
      return res.status(400).json({ message: "The user is already following" });
    }

    //create a follow model
    const followModel = new fuzyFollowModel({
      currentUserId,
      targetUserId,
    });

    await followModel.save();

    await fuzyUserModal.updateOne(
      { _id: currentUserId },
      { $addToSet: { following: follow._id } }
    );
    await fuzyUserModal.updateOne(
      { _id: targetUserId },
      { $addToSet: { followers: follow._id } }
    );
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while finding data" + " : " + error });
  }
});

const unFollowingUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const targetUserId = id;
    const currentUserId = req.user.id;

    const targetUser = await fuzyUserModal.findById({ targetUserId });
    const currentUser = await fuzyUserModal.findById({ currentUserId });

    if (!targetUser || !currentUser) {
      return res.status(400).json({
        message: "The users are invalid",
      });
    }

    const existingFollow = await fuzyFollowModel.findById({
      currentUserId,
      targetUserId,
    });

    if (!existingFollow) {
      res.status.json({
        message: "you are not following this user",
      });
    }

    const followModel = fuzyFollowModel({
      currentUserId,
      targetUserId,
    });

    await followModel.save();

    await User.updateOne(
      { _id: currentUserId },
      { $pull: { following: followModel._id } }
    );
    await User.updateOne(
      { _id: targetUserId },
      { $pull: { followers: followModel._id } }
    );
  } catch (error) {
    res.status(400).json({
      message: "There is error while following" + " " + error,
    });
  }
});

const followingCount = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    //if the id is in array:
    const followingCount = await fuzyUserModal.countDocuments({
      following: { $in: [id] },
    });
    fuzyUserModal.followingCount = followingCount;

    await fuzyUserModal.save();

    if (followingCount) {
      res.status(201).json({
        fuzyFollowingCount: followingCount,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Unable to generate the count of following",
    });
  }
});

const followerCount = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const followersCount = await fuzyUserModal.countDocuments({
      follower: { $in: [id] },
    });
    fuzyUserModal.followersCount = followersCount;

    await fuzyUserModal.save();

    if (followersCount) {
      res.status(201).json({
        fuzyFollowersCount: followersCount,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Unable to generate the count of followers",
    });
  }
});
module.exports = {
  followingUser,
  unFollowingUser,
  followerCount,
  followingCount,
};
