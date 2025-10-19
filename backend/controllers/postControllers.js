const Post = require('../models/Post');

//@desc Create a post
//@route POST /api/posts
//@access Private
const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json ({msg: 'Content is required'});
        }
        const post = new Post({
            user: req.user._id,
            content
        });

        await post.save();
        res.status(201).json(post);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error'});
    }
};

// @desc Get all posts
// @route Get /api/posts
// @access Public
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username email');
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error'});
    }
};

// @desc Delete a post
// @route DELETE /api/posts/:id
// @acces Private (owner or admin)
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found'});
        }
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: 'Not authorized'});
        }

        await post.deleteOne();
        res.json({ msg: 'Post deleted'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error'});
    }
};

module.exports = { createPost , getPosts, deletePost }