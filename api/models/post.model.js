import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['career advice', 'industry insight', 'networking', 'mentorship', 'general'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
