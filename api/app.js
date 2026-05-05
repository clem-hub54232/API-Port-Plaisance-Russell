const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'env', '.env') });

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const indexRouter = require('./routes/index');
const mongodb = require('./db/mongo');

mongodb.initClientDbConnection();

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', process.env.TRUST_PROXY === 'true' ? 1 : false);
app.use(helmet());
app.use(cors({
    origin(origin, callback) {
        const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
            .split(',')
            .map((value) => value.trim())
            .filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('not_allowed_by_cors'));
    }
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-8',
    legacyHeaders: false
}));
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use(function (err, req, res, next) {
    if (err.message === 'not_allowed_by_cors') {
        return res.status(403).json({ message: 'cors_origin_forbidden' });
    }

    console.error('SERVER ERROR:', err);
    return res.status(500).json({ message: 'server_error' });
});
app.use(function (req, res, next) {
    res.status(404).json({ name: 'API', version: '1.0', status: 404, message: 'not_found' })
});

module.exports = app;
