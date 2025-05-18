const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const handleGoogleAuth = async (req, res) => {
  const { id_token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub: uid, email, name: username } = ticket.getPayload();

    let isNew = false;
    let user = await User.findOne({ email });
    if (!user) {
      isNew = true;
      user = new User({ username, email, uid });  // now password is optional
      await user.save();
    }

    const token = jwt.sign(
      { user: { id: user._id } },
      process.env.JWT_SECRET,
      { expiresIn: '31d' }
    );
    return res.json({ success: true, token, isNew });

  } catch (err) {
    console.error('Google Auth Error:', err);
    // Distinguish token verification errors vs. schema validation
    if (err.name === 'TokenMismatchedError' || err.message.includes('audience')) {
      return res.status(400).json({ success: false, message: 'Invalid Google token' });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = handleGoogleAuth;
