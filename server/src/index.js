// const http = require('http');
//
// let server = http.createServer(app);
//
// server.listen(5000);

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const {config} = require('./config');

dotenv.config();

const serverRequestLimit = rateLimit({
    windowMs: 10000,
    max: 100 // TODO
});

const app = express();
const appRoot = path.resolve(process.cwd(), '../')

app.use(morgan('dev'));
app.use(helmet());
app.use(serverRequestLimit);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(appRoot, 'public')));

// TODO router

function customErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Unknown Error',
            code: err.code
        });
}

app.use(customErrorHandler);

app.listen(config.PORT, () => {
    console.log(`listen ${config.PORT}`);
});

process.on('SIGTERM', () => {
    app.close(() => {
        process.exit(0);
    })
});

process.on('uncaughtException', error => {
    console.log(error);
});

process.on('unhandledRejection', error => {
    console.log(error);
});
