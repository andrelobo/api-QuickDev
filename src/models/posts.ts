// src/models/post.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  user_id: string;
  title: string;
  description: string;
  image: string; // Caminho da imagem
}

const postSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;
