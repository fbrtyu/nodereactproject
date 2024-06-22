'use strict'
import { Router, Response, Request } from "express";
var jwt = require('jsonwebtoken');
import { connection } from '../../databases/MySQL/mysqlconnect';
import bcrypt from 'bcrypt';
require('dotenv').config({ path: `./config/.env` });

export async function checkTokens(login: string = "", password: string = "", accessToken: string = "", refreshToken: string = "", res: Response) {
    let accessTokenFlag = true;
    let refreshTokenFlag = true;

    let stop = false;

    if (accessToken != "" && stop == false) {
        try {
            jwt.verify(accessToken, process.env.SECRETACCESS);
            stop = true;
            // answer to server OK
            //res.sendStatus(200);
        } catch (err) {
            accessTokenFlag = false;
            console.log(err);
        }
    }

    if (refreshToken != "" && stop == false) {
        try {
            jwt.verify(refreshToken, process.env.SECRETREFRESH);
            stop = true;

            // search login in DB
            const [results, fields] = await (await connection).query({ sql: 'SELECT `realname` FROM `authme` WHERE `refresh_token` = ' + '"' + refreshToken + '"' });
            const answer = results as any;

            // update all tokens
            var access_token = await jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 / 2),
                login: answer[0].realname
            }, process.env.SECRETACCESS);

            var refresh_token = await jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                login: answer[0].realname
            }, process.env.SECRETREFRESH);

            const result = await (await connection).query('UPDATE `authme` SET `access_token` = ?, `refresh_token` = ? WHERE `realname` = ?', [access_token, refresh_token, login]);

            res.send(JSON.stringify({ "accessToken": access_token, "refreshToken": refresh_token }));

        } catch (err) {
            refreshTokenFlag = false;
            console.log(err);
        }
    }

    if (accessTokenFlag == false && refreshTokenFlag == false && stop == false) {
        try {
            const [results, fields] = await (await connection).query({ sql: 'SELECT `password` FROM `authme` WHERE `realname` = ' + '"' + login + '"' });
            const answer = results as any;
            const passwordHash = answer[0].password;
            console.log(passwordHash);

            bcrypt.compare(password, passwordHash, async function (err, result) {
                console.log(result);
                if (result == true) {
                    // Generate new jwt and send it to client
                    var access_token = await jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 / 2),
                        login: login
                    }, process.env.SECRETACCESS);

                    var refresh_token = await jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        login: login
                    }, process.env.SECRETREFRESH);

                    const result = await(await connection).query('UPDATE `authme` SET `access_token` = ?, `refresh_token` = ? WHERE `realname` = ?', [access_token, refresh_token, login]);

                    res.send(JSON.stringify({ "accessToken": access_token, "refreshToken": refresh_token }));

                    //res.sendStatus(200);
                } else {
                    console.log("Wrong Password");
                    //res.sendStatus(404);
                }
            });
            //(await connection).destroy();
        } catch (err) {
            console.log(err);
        }
    }
}