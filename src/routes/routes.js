const express = require("express");
const { getUsers, register, login, logout } = require("../controllers/auth")
const { refreshToken, verifyToken } = require("../middleware/auth")


const router = express.Router();

// Test JWT Function
router.get('/users', verifyToken, getUsers);
router.post('/users', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);


module.exports = router;