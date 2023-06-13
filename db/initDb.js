const moongose = require("mongoose");
//sigleton approach for database initialization
class mongoDatabase {
  connection = moongose.connection;
  options = {
    serverSelectionTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  constructor() {
    try {
      //open event fires when connection is successfull
      this.connection.once("open", () => {
        console.log("Connection to MongDb has been established");
      });
      //initial connection error
      this.connection.on("error", (error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
    //disconnected from server
    this.connection.on("disconnected", () => {
      console.log("Database is disconnected");
    });
  }

  async dbConnection(dbUserName, dbPassword, dbname) {
    try {
      await moongose.connect(
        `mongodb+srv://${dbUserName}:${dbPassword}@${dbname}.cv9ka.mongodb.net/?retryWrites=true&w=majority`,
        this.options
      );
    } catch (error) {
      console.error(error);
    }
  }

  async dbCloseConnection() {
    try {
      await this.connection.close();
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new mongoDatabase();
