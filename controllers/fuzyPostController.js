const fuzyPostModel = require("../models/fuzyPostModel");
const asyncHandler = require("express-async-handler");
const fuzyPostController = asyncHandler(async (req, res, next) => {
  const { fuzyUser, uploadImg, fuzyCaption } = req.body;
  //create a database
  const fuzyPost = new fuzyPostModel({
    fuzyUser,
    uploadImg,
    fuzyCaption,
  });
  try {
    const fuzyPostsData = await fuzyPost.save();
    if (fuzyPostsData) {
      return res.status(201).json({ fuzyPostsDataResponse: fuzyPostsData });
    }
  } catch (error) {
    res.status(400).json({ message: "Error while posting data" + ":" + error });
  }
});
module.exports = { fuzyPostController };
