const util = require("util")
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../config/db.config.js");
const { resolve } = require("path");

let storageUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}.`

const storage = new GridFsStorage({
    url: storageUrl,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const match = ["image/png", "image/jpg", "image/jpeg", "image/PNG", "image/JPG", "image/JPEG"];
            if (match.indexOf(file.mimetype) === -1) {
                const filename = `${Date.now()}-Hitani-${file.originalname}`;
                resolve(filename);
            }
            const fileInfo = {
                bucketName: dbConfig.PHOTOBUCKET,
                filename: `${Date.now()}-Hitani-${file.originalname}`,
                metadata: { userId : req.userId, }
            }
            resolve(fileInfo);
        })
    }
});

const uploadFiles = multer({ storage }).single("file");
const uploadFilesMiddleware = util.promisify(uploadFiles);
const upload = { uploadFilesMiddleware };
module.exports = { upload };
