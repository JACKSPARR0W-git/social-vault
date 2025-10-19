const User = require('../models/User');
const bcrypt = require('bcryptjs');

//@desc Register a new user
//@desc POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        console.log("Incoming data:", req.body); // ✅ Check if body is coming
        
        const { username, email, password } = req.body;
        console.log("Parsed:", username, email, password); // ✅ Check destructuring

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword });

        await user.save();
        console.log("User saved successfully:", user); // ✅ Log success before response
        
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error("🔥 Actual error name:", err.name);
console.error("🔥 Actual error message:", err.message);
console.error("🔥 Actual error stack:", err.stack);

        res.status(500).json({ msg: 'Server error' });
    }
};


//@desc Login user
//@desc POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials'});

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials'})

        const jwt = require('jsonwebtoken');

        const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }  // ✅ THIS EXACTLY
);


        res.status(200).json({ msg: 'Login successful', token })

    } catch (err) {
        console.error("Error details:", err.message, err.stack);
res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

module.exports = { registerUser , loginUser};