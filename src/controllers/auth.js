const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id', 'username', 'email', 'firstname', 'lastname']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

const register = async(req, res) => {
    const {firstname, lastname, username, email, password, confPassword} = req.body;
    if(password != confPassword){
        return res.status(400).json( {msg: "Password yang anda masukkan tidak cocok"});
    }
    
    const oldUser = await Users.findOne({email});
    if(oldUser){
        return res.status(409).json({msg: "User Already Exist. Please Login"})
    }

    const salt = bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: hashPassword
        });
        req.json({msg: "Register User Berhasil"})
    } catch(error) {
        console.log(error);
    }
}

const login = async(req, res) => {
    try {
        const user = await Users.findaAll({
            where:{
                username: req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match){
            return res.status(400).json({msg: "Password yang anda masukkan salah"})
        }
        
        const id = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const firstname = user[0].firstname;
        const lastname = user[0].lastname;

        const accessToken = jwt.sign({id, username, email, firstname, lastname}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '45s'
        });
        const refreshToken = jwt.sign({id, username, email, firstname, lastname}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken}, {
            where: {
                id: id
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly : true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({accessToken});
    } catch (error) {
        res.status(404).json({msg: "Error, username tidak ditemukan"})
    }
}

const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) {
        return res.sendStatus(204);
    }
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if(!user[0]){
        return res.sendStatus(204);
    }
    const id = user[0].id;
    await Users.update({refresh_token: null}, {
        where: {
            id: id
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}


module.exports = { getUsers, register, login, logout }