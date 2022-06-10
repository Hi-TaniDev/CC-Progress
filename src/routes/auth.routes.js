const { verifySignUp } = require("../middleware/");
const { authController } = require("../controllers/auth.controller.js")

module.exports = function(app) {
    app.use( (req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post("/register", verifySignUp.checkDuplicateEmail, authController.register);
    app.post("/login", authController.login);
    app.post("/logout", authController.logout);
};

