const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const logger = createLogger({
    level: 'info',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.errors({ stack: true }), json()),
    transports: [new transports.Console()]
});

module.exports = logger;
