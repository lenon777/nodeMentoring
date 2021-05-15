const jwt = require('jsonwebtoken');
import { v4 as uuidv4 } from 'uuid';
const { secret, tokens } = require('../../config/config').jwtData;

const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ success: false, message: 'No token provided' });
    }

    return jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(403).send({ success: false, message: 'Invalid token' });
        }
        next();
    });
};

const generatAccessToken = (userId) => {
    const payload = {
        userId,
        type: tokens.access.type
    };
    const options = { expiresIn: tokens.access.expires };
    return jwt.sign(payload, secret, options);
};

const generateRefreshToken = () => {
    const payload = {
        id: uuidv4(),
        type: tokens.refresh.type
    };
    const options = { expiresIn: tokens.refresh.expires };
    return {
        id: payload.id,
        token: jwt.sign(payload, secret, options)
    };
};

const replaceDbRefreshToken = (tokenId,userId) => {
	
}

module.exports = checkToken;
