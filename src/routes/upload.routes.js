const { authJwt } = require("../middleware/authJwt.js");
const { uploadFilesMiddleware } = require("../middleware/upload.js")
const { uploadFiles } = require("../controllers/upload.controller.js");

module.exports = function(app) {
    app.use( (req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post("/upload", [authJwt.verifyToken], uploadFiles);
    // app.get("/files", authJwt.verifyToken, getListFiles);
};