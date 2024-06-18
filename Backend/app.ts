"use strict";
import express from 'express';
require('dotenv').config({ path: `./config/.env` });
import compression from 'compression';
import { authRouter } from './api/routers/authRouter';

const host:string = process.env.HOST as string;
const port:number = process.env.PORT as unknown as number;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(authRouter);

app.listen(port as number, host as string, () => console.log(`Server listens http://${host}:${port}`));