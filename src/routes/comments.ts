// src/routes/comment.ts
import { Router } from 'express';
import { createComment, getComments, updateComment, deleteComment } from '../controllers/commentController';
import authenticateToken from '../middlewares/auth';

const router = Router();

router.post('/', authenticateToken, createComment);
router.get('/', getComments);
router.put('/:id', authenticateToken, updateComment);
router.delete('/:id', authenticateToken, deleteComment);

export default router;
