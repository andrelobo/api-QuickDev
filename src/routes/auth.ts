// src/routes/auth.ts
import { Router } from 'express';
import { register, login, allUsers } from '../controllers/authController';
import authenticateToken from '../middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticateToken, allUsers);

export default router;
