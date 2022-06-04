const { verifySignUp } = require("../middleware");
const { register, login } = require("../controllers/auth.controller.js")

module.exports = function(app) {
    app.use( (req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post("/register", verifySignUp.checkDuplicateEmail, register);
    app.post("/login", login);
};

