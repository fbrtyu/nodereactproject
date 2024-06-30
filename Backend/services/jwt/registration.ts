"use strict";
import { Router, Response, Request } from "express";
import { connection } from '../../databases/MySQL/mysqlconnect';
import bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');
require('dotenv').config({ path: `./config/.env` });

const saltRounds = 10;

export async function registration(login: string, password: string, res: Response) {
    var access_token = await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 / 2),
        login: login
    }, process.env.SECRETACCESS);

    var refresh_token = await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        login: login
    }, process.env.SECRETREFRESH);

    try {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            const result = await (await connection).query('INSERT INTO `user_jwt` (`login`, `password`, `access_token`, `refresh_token`) VALUES(?, ?, ?, ?)',
                                                            [login, hash, access_token, refresh_token]);
            res.send(JSON.stringify({"accessToken": access_token, "refreshToken": refresh_token}));
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}