// const http = require('http');
//
// let server = http.createServer(app);
//
// server.listen(5000);

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
// const mongoose = require('mongoose');

const {config} = require('./config');
const {configureCors, setupDB} = require('./helpers');
const {userRouter} = require('./routes');

const serverRequestLimit = rateLimit({
    windowMs: config.serverRateLimits.period,
    max: config.serverRateLimits.maxRequests
});

const app = express();
const appRoot = path.resolve(process.cwd(), '../');

// const configureCors = (origin, callback) => {
//     const whiteList = config.ALLOWED_ORIGIN.split(';');
//
//     // For Postman
//     if (!origin) {
//         return callback(null, true);
//     }
//
//     if (!whiteList.includes(origin)) {
//         return callback(new Error('Blocked by CORS'), false);
//     }
//
//     return callback(null, true);
// };

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
// app.use('/product', productRouter);
app.use('/users', userRouter);

function customErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Unknown Error',
            code: err.code
        });
}

// function setupDB() {
//     mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
//
//     mongoose.connection.on('error', console.log.bind(console, 'MONGO ERROR'));
// }

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

// потрібно замінити, наприклад,
// const { error } = Joi.validate(user, newUserValidationSchema);
// на
// const { error } = newUserValidationSchema.validate(user);
