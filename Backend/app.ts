"use strict";
import express from 'express';
import cors from 'cors';
require('dotenv').config({ path: `./config/.env` });
import compression from 'compression';
import { authRouter } from './api/routers/authRouter';

const host: string = process.env.HOST as string;
const port: number = process.env.PORT as unknown as number;

let corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(compression());
app.use(authRouter);

app.listen(port as number, host as string, () => console.log(`Server listens http://${host}:${port}`));