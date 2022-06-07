const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { customAlphabet } = require("nanoid");

// Mysql DB
// const register = (req, res) => {
//     let nanoid = customAlphabet('1234567890', 8);
//     User.create({
//         id: nanoid(),
//         name: req.body.name,
//         email: req.body.email,
//         password: bcrypt.hashSync(req.body.password, 8)
//     }).then(() => {
//         res.send({message: "User was registered succesfully!"})
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message
//         });
//     });
// };

// const login = (req, res) => {
//     User.findOne({
//         where: {
//             email: req.body.email,
//         }
//     }).then(user => {
//         if(!user){
//             return res.status(404).send({
//                 message: "Pengguna tidak ditemukan!"
//             });
//         }

//         let passwordIsValid = bcrypt.compareSync(
//             req.body.password,
//             user.password
//         );
//         if(!passwordIsValid){
//             return res.status(401).send({
//                 accessToken: null,
//                 message: "Password Salah!"
//             });
//         }
        
//         let token = jwt.sign({ id: user.id }, config.secret, {
//             expiresIn: 43200
//         });

//         res.status(200).send({
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             accessToken: token
//         })
//     }).catch(err => {
//         res.status(500).send({message: err.message});
//     })
// };

// MongoDB
const register = (req, res) => {
    let nanoid = customAlphabet('1234567890', 8);
    if (req.body.confPassword === req.body.password) {
        const user = new User({
            id: nanoid(),
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        user.save((err, user) => {
            if(err){
                res.status(500).send({
                    message: err
                });
                return;
            };
           res.status(200).send({ message: "User succesfully registered!"});
           return;
        });
    } else{
        res.status(403).send({ message : "Pastikan password yang anda masukkan sama!"});
        return;
    }
    
};

const login = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(!user){
            return res.status(404).send({
                message: "Pengguna tidak ditemukan!"
            });
        }
        if(err){
            res.status(500).send({
                message: err
            });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Password Salah!"
            });
        }
        
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 7200
        });

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token
        });
    })
}

const logout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            message: "Logout berhasil"
        });
    }
    catch (err) {
        this.next(err);
    }
}

const authController = { register, login, logout };

module.exports = { authController };