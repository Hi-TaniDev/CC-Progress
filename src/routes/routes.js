import express from "express";
import { getUsers, register, login, logout } from "../controllers/auth.js";
import { refreshToken, verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Test JWT Function
router.get('/users', verifyToken, getUsers);
router.post('/users', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);


export default router;