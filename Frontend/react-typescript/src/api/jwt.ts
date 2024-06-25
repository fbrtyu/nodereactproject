"use strict"

import renderLkPage from "../components/lk";

export async function registration(login: string, password: string) {
    const data = {
        login: login,
        password: password
    };

    const response = await fetch('http://localhost:7777/registration', {
        method: "POST",
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    if (response.status == 200) {
        let tokens = await response.json();
        localStorage.setItem('access_token', tokens.accessToken);
        localStorage.setItem('refresh_token', tokens.refreshToken);
        renderLkPage();
    }
};

export async function login(login: string = "", password: string = "", accessToken: string = "", refreshToken: string = "") {
    const data = {
        login: login,
        password: password,
        accessToken: accessToken,
        refreshToken: refreshToken
    };

    const response = await fetch('http://localhost:7777/login', {
        method: "POST",
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    let tokens = await response.json();

    if (response.status == 200 && tokens.answer == "accessToken OK") {
        renderLkPage();
    } else {
        localStorage.setItem('access_token', tokens.accessToken);
        localStorage.setItem('refresh_token', tokens.refreshToken);
        renderLkPage();
    }
};