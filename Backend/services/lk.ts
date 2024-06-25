'use strict'
import { Router, Response, Request } from "express";
export async function lk(accessToken: string, res: Response) {
    console.log("/lk");
    let userData = {
        login: "",
        data: ""
    };

    //Get data from db

    userData.login = "1231321";
    userData.data = "sdasdasd";

    res.send(JSON.stringify(userData));
}