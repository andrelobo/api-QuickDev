// post.model.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  user_id: string;
  title: string;
  description: string;
  image?: string;
  editHistory: Array<{ editedAt: Date; title: string; description: string }>;
  views: number;
  likes: number;
  dislikes: number;
}

const postSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true },
  image: { type: String },
  editHistory: [{ editedAt: { type: Date, default: Date.now }, title: String, description: String }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;
