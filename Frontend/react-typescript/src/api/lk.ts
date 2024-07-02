'use strict'
//import { env } from "process";

export async function lk(accessToken: string) {
    const data = {
        accessToken: accessToken
    };

    const response = await fetch('http://' + 'backend' + ':' + '7777' + '/lk', {
        method: "POST",
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    let answer = await response.json();
    
    return answer;
};