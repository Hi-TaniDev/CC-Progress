const { authJwt } = require("../middleware/authJwt.js");
const userController = require("../controllers/user.controller.js");

module.exports = function(app) {
    app.use( (req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.get("/publicBoard", userController.allAccess);
    app.get("/userBoard", authJwt.verifyToken, userController.userAccess);
};