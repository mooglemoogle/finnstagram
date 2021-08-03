import express, { json } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { config } from 'dotenv';

config();

import routes from '@finn/routes/index';
import { MongoClient } from 'mongodb';
import { env } from 'process';

const app = express();

app.use(
    json(),
    cors({
        origin: process.env.CLIENT_URL,
        optionsSuccessStatus: StatusCodes.OK,
    })
);

MongoClient.connect(`${env.DB_HOST}:${env.DB_PORT}`)
    .then((client) => {
        const db = client.db(env.DB_NAME);
        app.use(routes(db));

        app.use('*', (req, res) => {
            res.status(StatusCodes.NOT_FOUND).send('404 Not Found');
        });

        app.listen(process.env.APP_PORT, () => {
            console.log(`Finnstagram listening on port ${process.env.APP_PORT}`);
        });
    });
