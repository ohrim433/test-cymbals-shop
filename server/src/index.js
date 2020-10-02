const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');

const {config} = require('./config');
const {ResponseStatusCodesEnum} = require('./constants');
const {configureCors, setupDB} = require('./helpers');
const {userRouter, productRouter} = require('./routes');

const serverRequestLimit = rateLimit({
    windowMs: config.serverRateLimits.period,
    max: config.serverRateLimits.maxRequests
});

const app = express();
const appRoot = path.resolve(process.cwd(), '../');

app.use(morgan('dev'));
app.use(helmet());
app.use(serverRequestLimit);
app.use(cors({
    origin: configureCors
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(appRoot, 'public')));

// app.use('/admin', adminRouter);
// app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/users', userRouter);

function customErrorHandler(err, req, res, next) {
    res
        .status(err.status || ResponseStatusCodesEnum.SERVER)
        .json({
            message: err.message || 'Unknown Error',
            code: err.code
        });
}

setupDB();

app.use(customErrorHandler);

app.listen(config.PORT, () => {
    console.log(`listen ${config.PORT}`);
});

process.on('SIGTERM', () => {
    app.close(() => {
        process.exit(0);
    });
});

process.on('uncaughtException', error => {
    console.log(error);
});

process.on('unhandledRejection', error => {
    console.log(error);
});
