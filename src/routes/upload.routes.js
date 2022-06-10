const { authJwt } = require("../middleware/");
const { uploadController } = require("../controllers/upload.controller.js");

module.exports = function(app) {
    app.use( (req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post("/upload", authJwt.verifyToken, uploadController.uploadFiles);
    app.get("/files", authJwt.verifyToken, uploadController.getListFiles);
};