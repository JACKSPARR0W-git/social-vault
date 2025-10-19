const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    // 1️⃣ Check if Authorization header exists and starts with Bearer
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // 2️⃣ Extract token
        const token = req.headers.authorization.split(' ')[1];

        // 3️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4️⃣ Get user from DB (without password)
        req.user = await User.findById(decoded.id).select('-password');

        // 5️⃣ Continue
        next();
    } catch (err) {
        console.error('JWT Error:', err.message);
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = protect;
