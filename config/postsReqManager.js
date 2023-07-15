const dotenv = require("dotenv");
dotenv.config();

const postsReqClientManager = (req) => {
  const filesObj = req.files;

  const filesName = filesObj.map((files) => {
    return process.env.CLIENT_IMAGE_URI + files.filename;
  });

  const { fuzyUser, fuzyCaption } = req.body;
  return { filesName, fuzyUser, fuzyCaption };
};
module.exports = postsReqClientManager;
