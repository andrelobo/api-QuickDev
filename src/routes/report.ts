// routes/report.ts

import express, { Request, Response } from 'express';
import Post from '../models/posts';

const router = express.Router();

router.get('/report', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();

    const report = posts.map(post => ({
      title: post.title,
      comments: post.comments,
      views: post.views,
      likes: post.likes,
      dislikes: post.dislikes
    }));

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
