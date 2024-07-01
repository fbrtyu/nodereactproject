"use strict"
import { Router, Response, Request } from "express";
import { connection } from './../databases/MySQL/mysqlconnect';
require('dotenv').config({ path: `./config/.env` });
import { checkTokens } from '../middleware/checktokens';
import bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');

const saltRounds = 10;

export async function changePassword(accessToken: string, refreshToken: string, newPassword: string, oldPassword: string) {
    let answer = await checkTokens("", "", accessToken, refreshToken) as any;
    answer = await JSON.parse(answer as any);

    if (answer.status == "ok") {
        const [result, fields] = await (await connection).query('SELECT `password` FROM `user_jwt` WHERE `access_token` = ' + '"' + accessToken + '"');
        const answer = result as any;
        let resultBcrypt = await bcrypt.compare(oldPassword, answer[0].password);

        if (resultBcrypt == true) {
            let resultHashing = await bcrypt.hash(newPassword, saltRounds);
            let decodedjwt = await jwt.verify(accessToken, process.env.SECRETACCESS);
            try {
                const result = await (await connection).query('UPDATE `user_jwt` SET `password` = ? WHERE `login` = ?', [resultHashing, decodedjwt.login]);
                return JSON.stringify({"status": "ok"});
            } catch(err) {
                console.log(err);
                return JSON.stringify({"status": "err"});
            }
        } else {
            return JSON.stringify({"status": "err"});
        }
    } else {
        return JSON.stringify({"status": "err"});
    }
}