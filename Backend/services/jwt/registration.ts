"use strict";
import { connection } from '../../databases/MySQL/mysqlconnect';

export async function registration(login: string, password: string) {
    try {
        const [results, fields] = await (await connection).query(
            'SELECT * FROM `jwt`'
        );
    
        console.log(results);
        //console.log(fields);
    } catch (err) {
        console.log(err);
    }
    console.log(login, password);
}