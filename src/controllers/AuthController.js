const logErrorHelper = require('../logger/loggerHelper');
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
                return res.send(this.updateTokens(user.id));
            } else {
                return res.status(401).send({
                    successs: false,
                    message: 'Bad username/password'
                });
            }
        } catch (err) {
            logErrorHelper(req.method, req.body, err.message);
            return next(err);
        }
    }

    updateTokens(userId) {
        const accessToken = this.authService.generateAccessToken(userId);
        const refreshToken = this.authService.generateRefreshToken(userId);
        this.authService.replaceDbRefreshToken(refreshToken.token, userId);
        return { accessToken: accessToken, refreshToken: refreshToken };
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
			const jwt = this.authService.jwt();
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(400).json({ message: 'Token expired!' });
            } else if (err instanceof jwt.JsonWebTokenError) {
                return res.status(403).json({ message: 'Invalid token!' });
            }
        }
        const token = await this.tokenList.findOne({ id: payload.id });

        if (token === null) {
            throw new Error('Invalid token!');
        } else {
            return res.send(this.updateTokens(token.id));
        }
    }
}
