"use strict";
import { Router, Response, Request } from "express";
var jwt = require('jsonwebtoken');
import { connection } from '../../databases/MySQL/mysqlconnect';
import bcrypt from 'bcrypt';
require('dotenv').config({ path: `./config/.env` });
import {checkTokens} from "../../middleware/checktokens"
import { lk } from "../lk";

export async function login(accessToken: string = "", refreshToken: string = "", login: string = "", password: string = "", res: Response) {
  //checkTokens(login, password, accessToken, refreshToken, res);
  //res.redirect('http://localhost:7777/lk');
}