// post.controller.ts

import { Request, Response } from 'express';
import Post, { IPost } from '../models/posts';

// Criar uma nova postagem
export const createPost = async (req: Request, res: Response) => {
  try {
    const { user_id, title, description, image } = req.body;
    const post = new Post({ user_id, title, description, image });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Atualizar uma postagem
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { title, description } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Salvar a versão anterior da postagem no histórico de edições
    post.editHistory.push({ editedAt: new Date(), title: post.title, description: post.description });
    post.title = title;
    post.description = description;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Incrementar contador de visualizações de uma postagem
export const incrementViews = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.views += 1;
    await post.save();
    res.status(200).json({ message: 'View count incremented successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Incrementar contador de curtidas de uma postagem
export const incrementLikes = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes += 1;
    await post.save();
    res.status(200).json({ message: 'Like count incremented successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Incrementar contador de não curtidas de uma postagem
export const incrementDislikes = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.dislikes += 1;
    await post.save();
    res.status(200).json({ message: 'Dislike count incremented successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
