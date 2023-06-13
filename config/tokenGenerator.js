const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const tokenGeneration = (id, res) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRETE, {
      expiresIn: "1d",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "There was an error generating token" + ":" + error });
  }
};
module.exports = tokenGeneration;
