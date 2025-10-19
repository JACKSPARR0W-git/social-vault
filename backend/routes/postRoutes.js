const express = require('express');
const router = express.Router();
const { createPost, getPosts, deletePost } = require('../controllers/postControllers');
const protect = require('../middleware/authMiddleware');

// Create a post (private)
router.post('/', protect , createPost);

//Get all posts (public)
router.get('/', getPosts);

// Delete a post (private)
router.delete('/:id', protect, deletePost);

module.exports = router;