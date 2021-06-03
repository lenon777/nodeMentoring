const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/routes');
const logger = require('./logger/logger');
require('dotenv').config();

process.on('uncaughtException', (err) => {
    logger.error(err.message);
    logger.error(err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    logger.error(err.message);
    logger.error(err.stack);
    process.exit(1);
});

app.listen(3000);
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`Method ${req.method}+ Arguments ${req.method === 'GET' ? req.url : JSON.stringify(req.body)}`);
    next();
});
app.use(cors());
app.use('/', router);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use(async (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            method: req.method,
            message: error.message
        }
    });
});
