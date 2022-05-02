import express from 'express';
import { register, login, details } from "../Controllers/AuthControllers.js";
import checkUser from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post('/');
router.post('/register', register);
router.post('/login', login);
router.get('/userDetails', details);

export default router;