// post.controller.ts
import { Request, Response } from 'express';
import Post, { IPost } from '../models/posts';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { user_id, title, description, image } = req.body;
    const newPost = new Post({ user_id, title, description, image });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { title, description } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.editHistory.push({ editedAt: new Date(), title: post.title, description: post.description });
    post.title = title;
    post.description = description;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
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
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
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
    const updatedPost = await post.save();
    res.status(200).json({ message: 'View count incremented successfully', updatedPost });
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
    const updatedPost = await post.save();
    res.status(200).json({ message: 'Like count incremented successfully', updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

