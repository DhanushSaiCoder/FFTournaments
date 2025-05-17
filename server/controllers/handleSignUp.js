const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleSignUp = async (req, res) => {

    const { username, uid, email, password } = req.body;

    try {
        // Look for any conflicting document
        const existingUser = await User.findOne({ $or: [{ email }, { uid }, { username }] });
        if (existingUser) {
            console.log(existingUser)

            if (existingUser.email === email) {
                return res.status(400).json({errors: [{ field: 'email', msg: 'Email already in use' }]});
            }
            if (existingUser.uid === uid) {
                return res.status(400).json({errors: [{ field: 'uid', msg: 'UID already in use' }]});
            }
            if (existingUser.username === username) {
                return res.status(400).json({errors: [{ field: 'username', msg: 'Username already in use' }]});
            }
        }

        // Create user instance
        user = new User({ username, email, password, uid });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save to DB
        await user.save();

        // Generate JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '31d' });
        return res.json({ token });

    } catch (err) {
        console.error(err);
        return res.status(500).send(`Server error: ${err}`);

    }
}

module.exports = handleSignUp