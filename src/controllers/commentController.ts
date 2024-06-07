import { Request, Response } from 'express';
import Comment from '../models/coments';
import Post from '../models/posts';

// Interface personalizada para Requests autenticadas
interface AuthenticatedRequest extends Request {
  user?: string; // Ou o tipo que você usa para 'user'
}

// Criação de um comentário
export const createComment = async (req: AuthenticatedRequest, res: Response) => {
  const { post_id, description } = req.body;
  const user_id = req.user;

  try {
    const comment = new Comment({ user_id, post_id, description });
    await comment.save();

    // Enviar notificação por e-mail opcionalmente (comentado temporariamente)
    /*
    const post = await Post.findById(post_id).populate('user_id');
    if (post && post.user_id) {
      const postOwner = await User.findById(post.user_id);
      if (postOwner) {
        // Implementar lógica de envio de e-mail aqui
        // sendEmail(postOwner.email, 'New comment on your post', 'You have a new comment...');
      }
    }
    */

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find().populate('user_id', 'name').populate('post_id', 'title');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const updateComment = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { description } = req.body;
  const user_id = req.user;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user_id.toString() !== user_id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    comment.description = description;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteComment = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const user_id = req.user;

  try {
    const comment = await Comment.findById(id).populate('post_id');

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const post = comment.post_id as any;

    
    if (comment.user_id.toString() !== user_id && post.user_id.toString() !== user_id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    await comment.deleteOne();

    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
