const express = require("express");
const router = express.Router();
const {
  fuzyUserCreate,
  fuzyLogin,
} = require("../controllers/fuzyUsersController");
//registration user endPoints:
router.post("/fuzyUserRegistration", fuzyUserCreate);
router.post("/fuzyLogin", fuzyLogin);
module.exports = router;
