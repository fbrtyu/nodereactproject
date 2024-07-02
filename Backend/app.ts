"use strict";
import express from 'express';
import cors from 'cors';
require('dotenv').config({ path: `./config/.env` });
import compression from 'compression';
import { authRouter } from './api/routers/authRouter';
import { checkTokens } from "./middleware/checktokens";
import { userSettingsRouter } from './api/routers/userSettingsRouter';
//import os from 'os';

// const localIP = Object.values(os.networkInterfaces())
//     .flat()
//     .find(iface => iface?.family === 'IPv4' && !iface.internal)
//     ?.address;

// console.log(localIP);

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

app.use(async function (request, response, next) {
    if (request.url == "/registration") {
        next();
    } else if (request.url == "/login") {
        let answer = await checkTokens(request.body.login, request.body.password, request.body.accessToken, request.body.refreshToken) as any;
        let answerJSON = await JSON.parse(answer);
        if (answerJSON.status == "err") {
            return response.send(answerJSON);
        }
        if (answerJSON.status == "upd") {
            return response.send(answerJSON);
        }
        if (answerJSON.status == "ok") {
            return response.send(answerJSON);
        }
    } else {
        next();
    }
});

app.use(authRouter);
app.use(userSettingsRouter);

app.listen(port as number, () => console.log(`Server listens http://${host}:${port}`));