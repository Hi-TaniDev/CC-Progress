import Users from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const register = async(req, res) => {
    const {name, email, password, confPassword} = req.body;
    if(password !== confPassword){
        return res.status(400).json( {msg: "Password yang anda masukkan tidak cocok"});
    }
    
    const oldUser = await findOne({email});
    if(oldUser){
        return res.status(409).json({msg: "User Already Exist. Please Login"})
    }

    const salt = bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            nama: nama,
            email: email,
            password: hashPassword
        });
        req.json({msg: "Register User Berhasil"})
    } catch(error) {
        console.log(error);
    }
}

export const login = async(req, res) => {
    try {
        const user = await Users.findaAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match){
            return res.status(400).json({msg: "Password yang anda masukkan salah"})
        }
        
        const id = user[0].id;
        const name = user[0].name;
        const email = user[0].email;

        const accessToken = jwt.sign({id, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '45s'
        });
        const refreshToken = jwt.sign({id, name, email}, process.env.REFRESH_TOKEN_SECRET,{
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

export const logout = async(req, res) => {
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