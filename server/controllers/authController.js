const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, password, phonenumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(username, hashedPassword, phonenumber);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ success: "success", token, user });
  } catch (error) {
    console.error('Error logging in:', error);
    // res.status(500).json({ error: 'Internal Server Error' });
    res.json({success: "failed"});
  }
};