const multerMultiple = require("multer");
const dotenv = require("dotenv");
dotenv.config();

const path = require("node:path");
const MULTER_PATH = process.env.MULTER_PATH;

const multerStorage = multerMultiple.diskStorage({
  destination: (req, file, cb) => {
    cb(null, MULTER_PATH);
  },
  filename: (req, file, cb) => {
    const fileExt = file.mimetype.split("/")[1];
    cb(null, `image-${Date.now()}.${fileExt}`);
  },
});

const multerValidation = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extensionFiles = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeTypeClientFiles = filetypes.test(file.mimetype);

  if (extensionFiles && mimeTypeClientFiles) {
    return cb(null, true);
  }
  return cb(new Error("Only images are allowed"));
};

const multerPicSizeLimit = {
  fileSize: 8 * 1024 * 1024,
};

const multerConfig = multerMultiple({
  storage: multerStorage,
  limits: multerPicSizeLimit,
  fileFilter: multerValidation,
});

const multerMultiUpload = multerConfig.array("fuzyFiles[]", 10);
module.exports = { multerMultiUpload };
