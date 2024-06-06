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

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


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


export const incrementLikes = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: 'Missing postId' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes += 1;
    await post.save();
    res.status(200).json({ message: 'Like count incremented successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

