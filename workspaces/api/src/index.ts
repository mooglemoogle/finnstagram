import express, { json } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { config } from 'dotenv';

config();

// require('@app/service/logger');

// const { i18next, i18nextMiddleware } = require('@app/i18next');
// const authentication = require('@app/middleware/authentication');
// const routes = require('@app/route');

import routes from '@finn/routes/index';

const app = express();

app.use(
    json(),
    cors({
        origin: process.env.CLIENT_URL,
        optionsSuccessStatus: StatusCodes.OK,
    })
    // i18nextMiddleware.handle(i18next),
    // authentication
);

app.use(routes);

app.use('*', (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send('404 Not Found');
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Finnstagram listening on port ${process.env.APP_PORT}`);
});
