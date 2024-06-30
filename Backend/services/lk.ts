'use strict'
import { Router, Response, Request } from "express";
import { connection } from './../databases/MySQL/mysqlconnect';
require('dotenv').config({ path: `./config/.env` });

export async function lk(accessToken: string, res: Response) {
    console.log("/lk");
    let userData = {
        login: "",
        data: ""
    };

    //Get data from db
    const [result, fields] = await (await connection).query('SELECT `login` FROM `user_jwt` WHERE `access_token` = ' + '"' + accessToken + '"');
    const answer = result as any;

    userData.login = await answer[0].login;
    userData.data = "server data";

    res.send(JSON.stringify(userData));
}