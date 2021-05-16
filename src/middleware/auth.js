const jwt = require('jsonwebtoken');
const { secret } = require('../../config/jwtConfig').jwtData;

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Token is not provided' });
    }
    const token = authHeader.replace('Bearer ', '');

    try {
        const payload = jwt.verify(token, secret);
        if (payload.type !== 'access') {
            return res.status(403).json({ message: 'Invalid Token' });
        }
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token is expired' });
        }
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'Token is invalid' });
        }
    }

    next();
};
