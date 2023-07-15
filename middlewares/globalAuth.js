const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const fuzyUsersModel = require("../models/fuzyUsersModel");
dotenv.config();

const auth = asyncHandler((req, res, next) => {
  const sendUnAuthorizedRes = () => {
    return res.status(400).json({
      message: "Your are not authorized ",
    });
  };

  const authHeader = req.header("Authorization");
  if (!authHeader && !authHeader.startsWith("Bearer ")) {
    return sendUnAuthorizedRes();
  }
  const token = authHeader.replace("Bearer ", "");

  let decodedToken;
  decodedToken = jwt.verify(token, process.env.JWT_SECRETE);

  const id = decodedToken._id;
  const fuzyUser = fuzyUsersModel.findById(id);

  if (!fuzyUser) {
    sendUnAuthorizedRes();
  }

  req.user = fuzyUser;
  req.token = token;

  next();
});

module.exports = { auth };
