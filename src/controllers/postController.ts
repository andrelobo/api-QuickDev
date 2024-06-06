// src/controllers/postController.ts
import { Request, Response } from 'express';
import Post, { IPost } from '../models/post';

// Create a new post
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

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get post by ID
export const getPostById = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update post by ID
export const updatePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const { title, description, image } = req.body;
        const post = await Post.findByIdAndUpdate(postId, { title, description, image }, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete post by ID
export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
