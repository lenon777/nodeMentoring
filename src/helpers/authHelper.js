const { secret, tokens } = require('../../config/jwtConfig').jwtData;
const tokenList = require('../models/TokenModel');
const jwt = require('jsonwebtoken');
import { v4 as uuidv4 } from 'uuid';

const generateAccessToken = (userId) => {
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

const replaceDbRefreshToken = async (token, userId) => {
    const user = await tokenList.update(
        { userId: userId, token: token },
        {
            where: { userId: userId }
        }
    );
    if (user[0] === 0) {
        await tokenList.create({ userId: userId, token: token });
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken
};
