const db = require("../models");
const User = db.user;

// Mysql DB
// const checkDuplicateEmail = (req, res, next) => {
//     User.findOne({
//         where: {
//             email: req.body.email
//         }
//     }).then((user) => {
//         if(user) {
//             res.status(400).send({
//                 message: "Gagal! Email sudah terdaftar."
//             });
//             return;
//         }
//         next();
//     }).catch(err => {
//         if(err){
//             res.status(500).send({
//                 message: "Gagal melakukan request"
//             });
//             return;
//         }
//     });
// };

// MongoDB
const checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((user, err) => {
        if(user){
            res.status(400).send({
                message: "Gagal! Email sudah terdaftar."
            });
            return;
        }
        if(err){
            res.status(500).send({
                message: err
            });
            return;
        }
        next();
    })
}

const verifySignUp = { checkDuplicateEmail :  checkDuplicateEmail };

module.exports = verifySignUp;