import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createPost,
  deletePost,
  getUserPosts,
} from '../controllers/post.controller.js';

const router = express.Router();

// create new post
router.post('/create/:userId', verifyToken, createPost);

// get all posts of user
router.get('/user/:userId', verifyToken, getUserPosts);

// delete a post
router.delete('/delete/:postId', verifyToken, deletePost);

export default router;
