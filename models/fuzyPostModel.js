const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fuzyPostModelSchema = new Schema({
  fuzyUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fuzy_users",
    required: true,
  },
  uploadImg: {
    type: Object,
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fuzy_users",
  },
  fuzyCaption: {
    type: String,
    default: "",
  },
});

const fuzyPostModel = mongoose.model("fuzy_posts", fuzyPostModelSchema);
module.exports = fuzyPostModel;
