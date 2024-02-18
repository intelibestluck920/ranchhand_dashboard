const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, 'your_secret_key', (error, user) => {
    if (error) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};