// jwt.js
const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
};
