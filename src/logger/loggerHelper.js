const logger = require('./logger');
const logErrorHelper = (method, args, message) => {
    logger.error({
        method,
        args,
        message
    });
};

module.exports = logErrorHelper;
