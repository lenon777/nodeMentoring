const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret, tokens } = require('../../config/jwtConfig').jwtData;

export default class AuthService {
    constructor(tokenList) {
        this.tokenList = tokenList;
    }

    compare(reqPassword, userPassword) {
        return bcrypt.compare(reqPassword, userPassword);
    }
    verify(refreshToken) {
        return jwt.verify(refreshToken, secret);
    }
    hash(password, salt) {
        return bcrypt.hash(password, salt);
    }
    jwt() {
        return jwt;
    }
    generateAccessToken(userId) {
        const payload = {
            userId,
            type: tokens.access.type
        };
        const options = { expiresIn: tokens.access.expires };
        return jwt.sign(payload, secret, options);
    }

    generateRefreshToken(id) {
        const payload = {
            id: id,
            type: tokens.refresh.type
        };
        const options = { expiresIn: tokens.refresh.expires };
        return {
            id: payload.id,
            token: jwt.sign(payload, secret, options)
        };
    }

    async replaceDbRefreshToken(token, userId) {
        const user = await this.tokenList.update(
            { userId: userId, token: token },
            {
                where: { userId: userId }
            }
        );
        if (user[0] === 0) {
            await this.tokenList.create({ userId: userId, token: token });
        }
    }
}
