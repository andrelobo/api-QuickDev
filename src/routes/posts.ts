// src/routes/post.ts
import { Router } from 'express';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controllers/postController';
import authenticateToken from '../middlewares/auth';

const router = Router();

router.post('/', authenticateToken, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);

export default router;
