    // src/models/comment.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  post_id: mongoose.Schema.Types.ObjectId;
  description: string;
  removedByUser?: boolean;
  removedByPostOwner?: boolean;
}

const commentSchema: Schema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  removedByUser: {
    type: Boolean,
    default: false
  },
  removedByPostOwner: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Comment = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;
