const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { customAlphabet } = require("nanoid");

const register = (req, res) => {
    let nanoid = customAlphabet('1234567890', 8);
    User.create({
        id: nanoid(),
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then( () => {
        res.send({message: "User was registered succesfully!"})
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

const login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        }
    }).then(user => {
        if(!user){
            return res.status(404).send({
                message: "Pengguna tidak ditemukan!"
            });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Password tidak ditemukan!"
            });
        }
        
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 43200
        });

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token
        })
    }).catch(err => {
        res.status(500).send({message: err.message});
    })
};

module.exports = { register, login }