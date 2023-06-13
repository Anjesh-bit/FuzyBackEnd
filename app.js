const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const initDb = require("./db/initDb");
const fuzyUserRouter = require("./router/fuzyUserRoute");
const fuzyPostRouter = require("./router/fuzyPostRoute");
dotenv.config();
const PORT = process.env.PORT || 5000;
//initialize the database connection:
initDb.dbConnection(
  process.env.DB_USER_NAME,
  process.env.DB_PASS,
  process.env.DB_NAME
);
//start a express app
const app = express(); 
// for cross origin conflict fix
app.use(cors());
app.use(express.json());
app.use("/users", fuzyUserRouter);
app.use("/posts", fuzyPostRouter);
app.listen(PORT, () => {
  console.log(`Server is Listening to a port ${PORT}`);
});
