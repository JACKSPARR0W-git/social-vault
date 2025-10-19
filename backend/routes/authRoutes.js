const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authControllers');
const protect = require('../middleware/authMiddleware');
const User = require('../models/User'); // ✅ This was missing

// @route POST /api/auth/register
router.post('/register', registerUser);

// @route POST /api/auth/login
router.post('/login', loginUser);

// @route GET /api/auth/profile (protected)
router.get('/profile', protect, async (req, res) => {
    try {
        res.json(req.user); // ✅ Already fetched in middleware
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
