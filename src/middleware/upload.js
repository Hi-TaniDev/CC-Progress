const util = require("util")
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../config/db.config.js");

let storageUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}.`

const storage = new GridFsStorage({
    url: storageUrl,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];
        if(match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-Hitani-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: dbConfig.PHOTOBUCKET,
            filename: `${Date.now()}-Hitani-${file.originalname}`
        };
    },
});

const uploadFiles = multer({ storage }).single("file");
const uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;

// module.exports = multer({ storage }).single("file");

// const multer = require("multer");

// const dbConfig = require("../config/db.config.js");
// let dbUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}.`

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now());
//     }
// })

// const uploadFiles = multer({ storage: storage })

// module.exports = uploadFiles;


