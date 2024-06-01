const jwt = require('jsonwebtoken');
const { getSecretKey } = require('../services/auth.service');
function authenticateToken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    else{
        token = token.replace("Bearer","").trim()
    }
    jwt.verify(token, getSecretKey(), (error, decodedToken) => {
        if (error) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.userId = decodedToken.userId;
        next();
    });
}
module.exports = { authenticateToken };