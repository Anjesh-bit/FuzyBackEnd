const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fuzyPostModelSchema = new Schema({
  fuzyUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fuzyusers",
    required: true,
  },
  uploadImg: {
    type: String,
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fuzyusers",
  },
  fuzyCaption: {
    type: String,
    default: "",
  },
});
const fuzyPostModel = mongoose.model("posts", fuzyPostModelSchema);
module.exports = fuzyPostModel;
