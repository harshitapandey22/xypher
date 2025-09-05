const jwt = require('jsonwebtoken');
const { JWT_SECRET, REFRESH_SECRET } = process.env;

exports.generateAccessToken = user => jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
exports.generateRefreshToken = user => jwt.sign(user, REFRESH_SECRET, { expiresIn: '7d' });

exports.verifyAccessToken = token => jwt.verify(token, JWT_SECRET);
exports.verifyRefreshToken = token => jwt.verify(token, REFRESH_SECRET);
