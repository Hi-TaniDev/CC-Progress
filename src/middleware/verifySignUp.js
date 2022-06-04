const db = require("../models");
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: "Gagal! Email sudah terdaftar."
            });
            return;
        }
        next();
    })
}

const verifySignUp = { checkDuplicateEmail :  checkDuplicateEmail };

module.exports = verifySignUp;