// models/posts.ts

import mongoose, { Document, Schema } from 'mongoose';

interface EditHistory {
  editedAt: Date;
  title: string;
  description: string;
}

export interface IPost extends Document {
  user_id: string;
  title: string;
  description: string;
  comments: number;
  views: number;
  likes: number;
  dislikes: number;
  image?: string;
  editHistory: EditHistory[];
}

const editHistorySchema: Schema = new Schema({
  editedAt: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const postSchema: Schema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
  },
  comments: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  editHistory: {
    type: [editHistorySchema],
    default: [],
  },
});

const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;
