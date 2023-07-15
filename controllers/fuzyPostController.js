const fuzyPostModel = require("../models/fuzyPostModel");
const fuzyUserModal = require("../models/fuzyUsersModel");
const fuzyFollowModel = require("../models/fuzyFollowModel");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const postsFilesClientManager = require("../config/postsReqManager");
dotenv.config();

const fuzyPostCreate = asyncHandler(async (req, res, next) => {
  const { filesName, fuzyUser, fuzyCaption } = postsFilesClientManager(req);
  //checks whether the id from req.body matches the data in database:
  const fuzyUserMatch = await fuzyUserModal.findById(fuzyUser);
  //create a database:
  const fuzyPost = new fuzyPostModel({
    fuzyUser,
    uploadImg: filesName,
    fuzyCaption,
  });

  try {
    const fuzyPostsData = await fuzyPost.save();

    //users referencing all the posts of them:
    if (fuzyUserMatch) {
      fuzyUserMatch.posts.push(fuzyPost.id);
      fuzyUserMatch.save();
    }

    if (fuzyPostsData) {
      return res.status(201).json({
        fuzyPostsDataResponse: {
          fuzyUser: fuzyPostsData.fuzyUser,
          uploadImg: fuzyPostsData.uploadImg,
          fuzyCaption: fuzyPostsData.fuzyCaption,
        },
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while posting data" + " : " + error });
  }
});

const fuzyPostFindPopulate = asyncHandler(async (req, res, next) => {
  try {
    //populate the feild fuzyUser of post Schema refering to userSchema
    const fuzyAllPostData = await fuzyPostModel
      .find({})
      .populate("fuzyUser", "-password")
      .sort({ createdAt: -1 })
      .exec();

    if (fuzyAllPostData) {
      res.status(201).json({
        fuzyAllPostData,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while finding posts" + " : " + error });
  }
});

const fuzyPostFindByIdPopulate = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const fuzyPostsById = await fuzyPostModel
      .findById(id)
      .populate("fuzyUser", "-password")
      .exec();

    if (fuzyPostsById) {
      res.status(201).json({
        fuzyPostsById,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while finding posts" + " : " + error });
  }
});

const fuzyPostsUpdateByIdPopulate = asyncHandler(async (req, res, next) => {
  const { filesName, fuzyUser, fuzyCaption } = postsFilesClientManager(req);
  try {
    const { id } = req.params;

    const fuzyPostsUpdatedData = await fuzyPostModel
      .findByIdAndUpdate(
        id,
        {
          $set: { fuzyUser, filesName, fuzyCaption },
        },
        { new: true }
      )
      .populate("fuzyUser", "-password");

    if (fuzyPostsUpdatedData) {
      res.status(400),
        json({
          fuzyPostsUpdatedData,
        });
    }
  } catch (error) {}
});

const fuzyPostsDeleteById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    await fuzyPostModel.findByIdAndDelete(id);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while deleting posts" + " : " + error });
  }
});

const fuzyPostOfOneUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const fuzyOneUserPosts = await fuzyPostModel
      .find({ fuzyUser: id })
      .populate("fuzyUser", "-password")
      .exec();

    if (fuzyOneUserPosts) {
      res.status(201).json({
        fuzyOneUserPosts,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while finding posts" + " : " + error });
  }
});

const fuzyPostsByOtherUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const targetUserId = id;
  const currentUserId = req.user.id;

  const followModel = await fuzyFollowModel.find({
    follows: { currentUserId },
    followeBy: { targetUserId },
  });

  const condition = {
    $or: [
      { following: { $in: [followModel._id] } },
      { follower: { $in: [followModel._id] } },
    ],
  };

  const fields = ["following follower", "follows followedBy posts"];

  const models = {
    // populate the posts field with the Post model:
    posts: "fuzy_posts",
  };

  //finds either follower or following:
  const followingUserPosts = await fuzyUserModal
    .find(condition)
    .populate(fields)
    .populate(models)
    .sort({ createdAt: -1 });

  if (followModel && followingUserPosts) {
    res.status(201).json({
      followingUserPosts,
    });
  }
});

module.exports = {
  fuzyPostCreate,
  fuzyPostFindPopulate,
  fuzyPostFindByIdPopulate,
  fuzyPostsUpdateByIdPopulate,
  fuzyPostsDeleteById,
  fuzyPostOfOneUser,
  fuzyPostsByOtherUser,
};
