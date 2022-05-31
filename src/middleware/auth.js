const Users = require('../models/users');
const jwt = require('jsonwebtoken');

const refreshToken = async(req, res) => {
    try {   
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.sendStatus(401);
        }
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]){
            return res.sendStatus(403);
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                return res.sendStatus(403);
            }

            const id = user[0].id;
            const username = user[0].username;
            const email = user[0].email;
            const firstname = user[0].firstname;
            const lastname = user[0].lastname;
            
            const accessToken = jwt.sign({id, username, email, firstname, lastname}, process.env.   ACCESS_TOKEN_SECRET,{
                expiresIn: '45s'
            });

            res.json({accessToken});
        });
    } catch(error) {
        console.log(error);
    }
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            return res.sendStatus(403);
        }
        req.email = decoded.email;
        next();
    })
}

module.export = { refreshToken, verifyToken }