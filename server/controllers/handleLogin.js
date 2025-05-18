const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { email, password,role } = req.body;

  try {
    // 1. Check if user exists by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 2. Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 3. Prepare JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role
      },
    };

    // 4. Sign JWT and send token in response
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '31d' });
    return res.json({ token });

  } catch (err) {
    console.error(err);
    return res.status(500).send(`Server error: ${err}`);
  }
}

module.exports = handleLogin;
