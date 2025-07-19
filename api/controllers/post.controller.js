import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

// create post
export const createPost = async (req, res, next) => {
  try {
    const { category, description } = req.body;

    const newPost = new Post({
      category,
      description,
      createdBy: req.params.userId,
    });

    const savedPost = await newPost.save();

    // also push post ID into user's posts array
    await User.findByIdAndUpdate(req.params.userId, {
      $push: { posts: savedPost._id },
    });

    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// get user posts
export const getUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ createdBy: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// delete post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return next(errorHandler(404, 'Post not found'));

    // only creator can delete
    if (post.createdBy.toString() !== req.user.id)
      return next(errorHandler(403, 'You can only delete your own post'));

    await Post.findByIdAndDelete(req.params.postId);

    // remove from user's posts array
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { posts: req.params.postId },
    });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
