"use strict";
import { Router, Response, Request } from "express";
var jwt = require('jsonwebtoken');
import { connection } from '../../databases/MySQL/mysqlconnect';
import bcrypt from 'bcrypt';
require('dotenv').config({ path: `./config/.env` });
import {checkTokens} from "./checktokens"

export async function login(accessToken: string = "", refreshToken: string = "", login: string = "", password: string = "", res: Response) {
  checkTokens(login, password, accessToken, refreshToken, res);
}