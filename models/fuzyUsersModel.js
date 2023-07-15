const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const fuzyUsersSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    emailorNumber: {
      type: Schema.Types.Mixed,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    dob: {
      type: Date,
      required: true,
    },
    pp: {
      type: String,
      default: "https://ibb.co/PT1k40L",
    },
    bio: {
      type: String,
      default: "",
    },
    followersCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "follows",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "follows",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fuzy_posts",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

//hash the password before saving:
fuzyUsersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //proceed to save:
    next();
  }
  const salt = await bcrypt.genSalt(10);
  //hash the pass:
  this.password = await bcrypt.hash(this.password, salt);
});

//return this to the caller function in userController:
fuzyUsersSchema.methods.comparePassword = async function (candidatePass) {
  return await bcrypt.compare(candidatePass, this.password);
};

const fuzyUsersModel = mongoose.model("fuzy_users", fuzyUsersSchema);
module.exports = fuzyUsersModel;
