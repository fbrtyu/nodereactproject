'use strict'
import { Router, Response, Request } from "express";
var jwt = require('jsonwebtoken');
import { connection } from '../databases/MySQL/mysqlconnect';
import bcrypt from 'bcrypt';
require('dotenv').config({ path: `./config/.env` });

export async function checkTokens(login: string = "", password: string = "", accessToken: string = "", refreshToken: string = "") {
    let accessTokenFlag = true;
    let refreshTokenFlag = true;

    let stop = false;

    let ans = {
        status: "",
        accessToken: "",
        refreshToken: ""
    }

    if (accessToken != null && stop == false) {
        try {
            await jwt.verify(accessToken, process.env.SECRETACCESS);
            stop = true;
            ans.status = "ok" as string;
            return JSON.stringify(ans);
        } catch (err) {
            accessTokenFlag = false;
            console.log(err);
            ans.status = "err" as string;
        }
    }

    if (refreshToken != null && stop == false) {
        try {
            await jwt.verify(refreshToken, process.env.SECRETREFRESH);
            stop = true;

            // search login in DB
            const [results, fields] = await (await connection).query({ sql: 'SELECT `login` FROM `user_jwt` WHERE `refresh_token` = ' + '"' + refreshToken + '"' });
            const answer = results as any;

            // update all tokens
            var access_token = await jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 / 2),
                login: answer[0].login
            }, process.env.SECRETACCESS);

            var refresh_token = await jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                login: answer[0].login
            }, process.env.SECRETREFRESH);

            const result = await (await connection).query('UPDATE `user_jwt` SET `access_token` = ?, `refresh_token` = ? WHERE `login` = ?', 
                                                            [access_token, refresh_token, answer[0].login]);

            ans.status = "upd" as string;
            ans.accessToken = access_token as string;
            ans.refreshToken = refresh_token as string;
            return JSON.stringify(ans);
        } catch (err) {
            refreshTokenFlag = false;
            console.log(err);
            ans.status = "err" as string;
        }
    }

    if ((ans.status == "") || (ans.status == "err" && login != null && password != null)) {
        if (login == "" || password == "") {
            ans.status = "err";
            return JSON.stringify(ans);
        } else {
            try {
                const [results, fields] = await (await connection).query({ sql: 'SELECT `password` FROM `user_jwt` WHERE `login` = ' + '"' + login + '"' });
                const answer = results as any;
                const passwordHash = await answer[0].password as string;

                let result = await bcrypt.compare(password, passwordHash);

                if (result == true) {
                    var access_token = await jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 / 2),
                        login: login
                    }, process.env.SECRETACCESS);

                    var refresh_token = await jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        login: login
                    }, process.env.SECRETREFRESH);

                    const result = await (await connection).query('UPDATE `user_jwt` SET `access_token` = ?, `refresh_token` = ? WHERE `login` = ?', 
                                                                    [access_token, refresh_token, login]);

                    ans.status = "upd" as string;
                    ans.accessToken = access_token as string;
                    ans.refreshToken = refresh_token as string;
                    return JSON.stringify(ans);
                } else if (result == false) {
                    ans.status = "err";
                    return JSON.stringify(ans);
                }
            } catch (err) {
                ans.status = "err";
                console.log(err);
                return JSON.stringify(ans);
            }
        }
    }

    if ((accessToken == "" && refreshToken == "" && login == "" && password == "") || (accessTokenFlag == false && refreshTokenFlag == false && stop == false)) {
        ans.status = "err";
        return JSON.stringify(ans);
    }
}