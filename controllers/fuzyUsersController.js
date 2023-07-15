const fuzyUserModel = require("../models/fuzyUsersModel");
const asyncHandler = require("express-async-handler");
const tokenGenerator = require("../config/tokenGenerator");

const fuzyUserCreate = asyncHandler(async (req, res, next) => {
  const { fname, lname, emailorNumber, password, dob } = req.body;
  const emailorNumberExists = await fuzyUserModel.findOne({ emailorNumber });

  if (emailorNumberExists) {
    return res
      .status(409)
      .json({ message: "The email or number you entered already exists" });
  }
  //create a database
  const fuzyUser = new fuzyUserModel({
    fname,
    lname,
    emailorNumber,
    password,
    dob,
  });
  //save to the database:(Note:callbacks in save, findOne,etc are depreciated on v7> ::::::::)
  try {
    const fuzyUsersData = await fuzyUser.save();

    //send response to client with response data:
    if (fuzyUsersData) {
      return res.status(201).json({
        fuzyUsersDataResponse: {
          id: fuzyUsersData.id,
          fname: fuzyUsersData.fname,
          lname: fuzyUsersData.lname,
          emailorNumber: fuzyUsersData.emailorNumber,
          dob: fuzyUsersData.dob,
          token: tokenGenerator(fuzyUsersData.id),
        },
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while saving data" + " : " + error });
  }
});

const fuzyLogin = asyncHandler(async (req, res, next) => {
  const { emailorNumber, password } = req.body;

  try {
    const fuzyUsersData = await fuzyUserModel.findOne({ emailorNumber });

    if (!fuzyUsersData) {
      return res.status(404).json({ message: "User is not found" });
    }

    //calls the comparePassword set to the UserSchema Section:
    if (!fuzyUsersData.comparePassword(password)) {
      return res.status(401).json({ message: "The password is invalid" });
    }

    res.status(201).json({
      fuzyUsersDataResponse: {
        id: fuzyUsersData.id,
        fname: fuzyUsersData.fname,
        lname: fuzyUsersData.lname,
        emailorNumber: fuzyUsersData.emailorNumber,
        dob: fuzyUsersData.dob,
        token: tokenGenerator(fuzyUsersData.id, res),
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while Logging in " + " : " + error });
  }
});

const fuzyUsersFindById = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const fuzySingleUserData = await fuzyUserModel.findById({ id });

    if (fuzyUserCreate) {
      res.status(201).json({
        fuzySingleUserData,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "There is an error finding data" + " " + error });
  }
});
module.exports = { fuzyUserCreate, fuzyLogin, fuzyUsersFindById };
