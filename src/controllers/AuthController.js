const logErrorHelper = require('../logger/loggerHelper');
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
export default class AuthController {
    constructor(tokenList, usersList, authService) {
        this.tokenList = tokenList;
        this.usersList = usersList;
        this.authService = authService;
    }

    async login(req, res, next) {
        try {
            const user = await this.usersList.findOne({
                where: {
                    login: req.body.login
                },
                raw: true
            });

            if (!user) {
                return res.status(404).json(`${req.body.login} does not exist. Please register first!`);
            }
            const match = await this.authService.compare(req.body.password, user.password);
            if (match) {
                const response = await this.updateTokens(user.id);
                return res.send(response);
            }
            return res.status(401).send({
                successs: false,
                message: 'Bad username/password'
            });
        } catch (err) {
            logErrorHelper(req.method, req.body, err.message);
            return next(err);
        }
    }

    async updateTokens(userId) {
        const accessToken = this.authService.generateAccessToken(userId);
        const refreshToken = this.authService.generateRefreshToken(userId);
        await this.authService.replaceDbRefreshToken(refreshToken.token, userId);
        return { accessToken, refreshToken };
    }

    async refreshToken(req, res) {
        const { refreshToken } = req.body;
        let payload;
        try {
            payload = this.authService.verify(refreshToken);
            if (payload.type !== 'refresh') {
                return res.status(403).json({ message: 'Invalid token!' });
            }
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(400).json({ message: 'Token expired!' });
            } else if (err instanceof JsonWebTokenError) {
                return res.status(403).json({ message: 'Invalid token!' });
            }
        }
        const token = await this.tokenList.findOne({ userId: payload.id });

        if (token === null) {
            throw new Error('Invalid token!');
        }
        const response = await this.updateTokens(token.userId);
        return res.send(response);
    }
}
