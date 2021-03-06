var express = require("express");
var Image = require("../models/image");
var ImageRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    //rejects storing file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

//store image in uploads folder using multer create reference to the file
ImageRouter.route("/uploadmulter").post(
  upload.single("imageData"),
  (req, res, next) => {
    console.log(req.body);
    const newImage = new Image({
      imageName: req.body.imageName,
      imageData: req.file.path
    });
    newImage
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({
          success: true,
          document: result
        });
      })
      .catch(err => next(err));
  }
);
