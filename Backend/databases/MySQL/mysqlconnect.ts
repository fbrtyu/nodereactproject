"use strict";
require('dotenv').config({ path: `./config/.env` });
import mysql from 'mysql2/promise';

export const connection = mysql.createConnection({
    host: process.env.HOSTDB,
    user: process.env.DBUSER,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD
});