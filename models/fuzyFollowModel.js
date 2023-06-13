const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fuzyFollowSchema = new Schema(
  {
    //followed by other user(1N:N):
    followeBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fuzyusers",
    },
    //one user follows other (1N:N):
    follows: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fuzyusers",
    },
  },
  {
    timestamps: true,
  }
);
const fuzyFollowModel = mongoose.model("follows", fuzyFollowSchema);
module.exports = fuzyFollowModel;
