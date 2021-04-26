const express = require('express');
const app = express();
const router = require('./routes/routes');
const logger = require('./logger/logger');

process.on('uncaughtException', (err) => {
    logger.error(err.message);
    logger.error(err.stack);
    process.exit(1);
});

app.listen(3000);
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`Method ${req.method}+ Arguments ${req.url}`);
    next();
});
app.use('/', router);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            method: req.method,
            message: error.message
        }
    });
});
